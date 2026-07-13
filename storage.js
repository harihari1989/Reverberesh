(function setupReverbereshStore(global) {
  "use strict";

  const DB_NAME = "reverberesh-coach";
  const DB_VERSION = 2;
  const EXERCISE_STORE = "exercises";
  const SESSION_STORE = "sessions";
  const ROUTINE_STORE = "routines";
  const FALLBACK_PREFIX = "reverberesh:";

  let dbPromise = null;

  function makeId(prefix) {
    const uuid = global.crypto?.randomUUID?.();
    return `${prefix}-${uuid || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
  }

  function openDatabase() {
    if (!global.indexedDB) return Promise.reject(new Error("IndexedDB unavailable"));
    if (dbPromise) return dbPromise;

    dbPromise = new Promise((resolve, reject) => {
      const request = global.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(EXERCISE_STORE)) {
          const exercises = db.createObjectStore(EXERCISE_STORE, { keyPath: "id" });
          exercises.createIndex("track", "track", { unique: false });
          exercises.createIndex("updatedAt", "updatedAt", { unique: false });
        }
        if (!db.objectStoreNames.contains(SESSION_STORE)) {
          const sessions = db.createObjectStore(SESSION_STORE, { keyPath: "id" });
          sessions.createIndex("completedAt", "completedAt", { unique: false });
        }
        if (!db.objectStoreNames.contains(ROUTINE_STORE)) {
          db.createObjectStore(ROUTINE_STORE, { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Unable to open IndexedDB"));
    });

    return dbPromise;
  }

  async function run(storeName, mode, operation) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      const request = operation(store);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Database operation failed"));
    });
  }

  function fallbackRead(storeName) {
    try {
      return JSON.parse(global.localStorage.getItem(`${FALLBACK_PREFIX}${storeName}`) || "[]");
    } catch {
      return [];
    }
  }

  function fallbackWrite(storeName, rows) {
    global.localStorage.setItem(`${FALLBACK_PREFIX}${storeName}`, JSON.stringify(rows));
  }

  async function list(storeName) {
    try {
      return await run(storeName, "readonly", store => store.getAll());
    } catch {
      return fallbackRead(storeName);
    }
  }

  async function put(storeName, value) {
    try {
      await run(storeName, "readwrite", store => store.put(value));
    } catch {
      const rows = fallbackRead(storeName).filter(row => row.id !== value.id);
      rows.push(value);
      fallbackWrite(storeName, rows);
    }
    return value;
  }

  async function remove(storeName, id) {
    try {
      await run(storeName, "readwrite", store => store.delete(id));
    } catch {
      fallbackWrite(storeName, fallbackRead(storeName).filter(row => row.id !== id));
    }
  }

  global.ReverbereshStore = {
    async listExercises() {
      const rows = await list(EXERCISE_STORE);
      return rows.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    },
    async saveExercise(exercise) {
      const now = new Date().toISOString();
      return put(EXERCISE_STORE, {
        ...exercise,
        id: exercise.id || makeId("exercise"),
        createdAt: exercise.createdAt || now,
        updatedAt: now,
      });
    },
    deleteExercise(id) {
      return remove(EXERCISE_STORE, id);
    },
    async listRoutineOrders() {
      return list(ROUTINE_STORE);
    },
    saveRoutineOrder(id, order) {
      return put(ROUTINE_STORE, {
        id,
        order: Array.from(order),
        updatedAt: new Date().toISOString(),
      });
    },
    async listSessions(limit = 8) {
      const rows = await list(SESSION_STORE);
      return rows
        .sort((a, b) => String(b.completedAt).localeCompare(String(a.completedAt)))
        .slice(0, limit);
    },
    saveSession(session) {
      return put(SESSION_STORE, {
        ...session,
        id: session.id || makeId("session"),
        completedAt: session.completedAt || new Date().toISOString(),
      });
    },
  };
})(window);
