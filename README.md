# Reverberesh

Reverberesh is a browser-based movement coach that combines a guided session UI with a procedural 3D avatar, spoken cues, and an optional neural pose overlay. The name combines "reverberate" and "refresh": clear cues repeat through the session while the user resets into a fresher rhythm. The app is intentionally lightweight: there is no build step, no backend, and no framework runtime. Everything runs client-side from three files plus CDN dependencies.

## What The App Does

- Supports four tracks: `Workout`, `Yoga`, `Dance`, and `Breathing Exercise`
- Supports two difficulty levels: `Beginner` and `Advanced`
- Adds a Yoga-only section switch for `Core Flow` and `Relaxation`
- Tunes the Relaxation yoga section for blood-pressure support with slow exhales, supported poses, and no breath holds
- Adds breathing exercises with phase-aware inhale, hold, exhale, hold timers plus upward/downward airflow arrows on the pose
- Renders a full-body animated avatar in Three.js
- Defaults to a mirrored follow-along avatar with guide lines for easier visual copying
- Uses eased pose timing, reduced seated/supine float, and subtle secondary motion for more realistic movement
- Drives the session from structured routine data in `script.js`
- Uses the Web Speech API for spoken cues
- Can enable an optional MediaPipe pose overlay on top of the 3D stage
- Adds an opt-in Camera Coach that tracks a user's full-body pose locally, compares joint angles with the current AI pose, and reports live match, visibility, rep, hold, and best-score stats
- Gives camera repositioning guidance when the head, feet, or key joints are outside the frame, or when the user is too near, too far, or off-center
- Adds an Exercise Studio for defining custom movements, selecting an avatar motion, writing instructions and cues, and appending saved exercises to a matching track
- Stores custom exercises and aggregate camera-session history in IndexedDB with a local-storage fallback
- Accepts URL parameters for deep-linking into a specific track, level, yoga section, and step

## Stack

- `HTML`: static application shell and controls
- `CSS`: theme system, layout, responsive behavior, stage styling
- `JavaScript`: app state, routines, animation, timer, speech, ML overlay
- `Three.js`: 3D avatar, camera, lighting, and render loop
- `MediaPipe Tasks Vision`: optional pose landmark detection and neural overlay
- `Web Speech API`: voice guidance
- `MediaDevices API`: opt-in local camera stream
- `IndexedDB`: custom exercise and aggregate session-stat persistence

## File Structure

```text
.
|-- index.html
|-- styles.css
|-- storage.js
|-- script.js
`-- assets/
    `-- pose-reference/
        `-- README.md
```

## Architecture At A Glance

```mermaid
flowchart TD
    A[index.html] --> B[script.js init()]
    B --> C[Build routine from track + level + section]
    B --> D[Bind UI events]
    B --> E[setupScene()]
    C --> F[renderStep()]
    D --> G[state mutations]
    G --> F
    F --> H[Update DOM panels]
    F --> I[transitionToAnimation()]
    E --> J[Three.js animate loop]
    J --> K[applyPose()]
    J --> L[updateCamera()]
    J --> M[renderer.render()]
    J --> N[updateNeuralPose()]
    N --> O[drawNeuralPose()]
    G --> P[speak()]
    G --> Q[timer tick loop]
    Q --> F
```

## Main Runtime Modules

### 1. Static UI Shell

`index.html` defines the entire visible application shell:

- hero content and track selectors
- timer and transport controls
- assist actions for voice, neural pose, and cue bursts
- current movement panel
- instruction sidebar
- session step list and reminder notes
- the `.animation-stage` mount point for the Three.js renderer and pose overlay canvas

The page loads external runtime dependencies directly from CDNs:

- `three.min.js`
- `vision_bundle.js` from MediaPipe Tasks Vision

There is no bundler or module loader. `script.js` runs as a single deferred script.

### Camera Coach

Camera Coach is off by default and starts only after a user action. It requests the browser camera, runs MediaPipe Pose Landmarker against the local video stream, and compares the user's visible joint angles with the projected AI avatar joints for the current movement.

The camera workspace reports:

- full-body visibility and framing readiness
- live pose-match percentage and best score
- matched hold time for controlled poses
- matched rep count for dynamic movements
- the joint area with the largest alignment difference
- repositioning guidance when the user is too near, too far, off-center, or partially outside the frame

Camera frames and raw landmarks are not uploaded or saved. Only aggregate session totals are written to the local database.

Camera access requires `https://` in production or `localhost` during development.

### Exercise Studio And Storage

Exercise Studio lets users define a movement name, track, level, duration, closest avatar animation, training focus, instructions, and short coaching cues. Saved movements are appended to the appropriate built-in routine.

The default database is IndexedDB because Reverberesh is deployable as a static GitHub Pages site and should work without account setup, secrets, or a paid backend. `storage.js` provides a small persistence API and falls back to local storage when IndexedDB is unavailable.

For future signed-in, multi-device sync, Firebase Cloud Firestore's no-cost Spark plan is a practical hosted option. Cloud sync should store exercise definitions and aggregate session records only, never camera frames or raw pose landmarks.

### 2. Style And Theme Layer

`styles.css` acts like a compact design system:

- CSS custom properties define the core palette, spacing, shadows, and transitions
- `body[data-track="..."]` swaps the visual theme per track
- shared component classes style cards, choice buttons, assist buttons, and step cards
- `.animation-stage` owns the 3D viewport layout
- `.pose-overlay-canvas` and `.pose-overlay-status` style the optional AI pose layer

This keeps track-specific styling declarative while the JavaScript only updates `document.body.dataset.track`.

### 3. Session Data Model

`script.js` stores the session model in plain JavaScript objects and factory functions.

#### Track configuration

The `tracks` object contains per-track metadata:

- labels and hero copy
- goal pills
- session notes
- tips and prompts
- voice timing and tone settings

#### Routine builders

The session content is generated by:

- `buildExerciseRoutine(level)`
- `buildBreathingRoutine(level)`
- `buildYogaRoutine(level)`
- `buildYogaRelaxationRoutine(level)`
- `buildDanceRoutine(level)`
- `buildRoutine(track, level)`

Each routine step is normalized into either:

- `movement` steps via `move(...)`
- `rest` steps via `rest(...)`

Each step includes:

- display content: `name`, `focus`, `summary`, `instructions`, `cues`
- timing: `duration`, `target`, `period`
- animation binding: `animation`
- optional breath timing: `breathPattern`
- mirrored follow-along display, controlled by `mirror`

Because routines are generated rather than hard-coded into the DOM, changing the session structure is mostly a data edit.

### 4. Pose And Animation Model

The 3D motion system is procedural rather than clip-based.

#### Pose schema

`P._base` defines a normalized skeletal pose contract for:

- root translation and rotation
- spine and head rotation
- left and right arm rotation plus elbow flexion
- left and right leg rotation plus knee flexion
- foot pitch and yaw

Each animation key in `P` defines two keyframes, `a` and `b`, plus a `speed`. Examples include:

- workout: `march`, `squat`, `punch`
- yoga: `chair`, `warrior`, `tree`, `goddess`, `skandasana-left`, `child-pose`, `shavasana`
- breath: `belly-breath`, `box-breath`
- dance: `dance-bounce`, `grapevine`, `freestyle`

#### Animation interpolation

The render loop computes a pose by:

1. Selecting the current animation key from the active step
2. Oscillating between keyframes `a` and `b`
3. Easing the cycle through `realisticCycle(...)`
4. Adding natural secondary motion through `applyNaturalMotion(...)`
5. Interpolating through transitions when the step changes
6. Applying the final joint rotations in `applyPose(...)`

This design keeps the motion system easy to extend without exporting external animation assets.

### 5. Three.js Avatar And Scene Graph

The avatar is assembled in `buildAvatar()` from primitive meshes:

- torso, hips, neck, head
- upper and lower arms
- upper and lower legs
- feet and shoes

The important architectural detail is that the avatar is rigged through nested `THREE.Group` nodes rather than a skinned mesh. The `bones` map stores references such as:

- `bones.root`
- `bones.spine`
- `bones.lArm`, `bones.rArm`
- `bones.lElbow`, `bones.rElbow`
- `bones.lLeg`, `bones.rLeg`
- `bones.lKnee`, `bones.rKnee`
- `bones.lFoot`, `bones.rFoot`

`applyPose(...)` converts the abstract pose contract into real group rotations, including left/right mirroring rules.

#### Scene setup

`setupScene()` creates:

- a `THREE.Scene`
- a perspective camera
- a transparent WebGL renderer
- ambient, key, rim, and fill lights
- a ground plane and rings for depth cues
- the avatar group
- a resize handler
- the continuous animation loop

### 6. Camera System

Camera behavior is data-driven through `CAM_PRESETS`.

Each animation can define:

- `angle`
- `height`
- `dist`
- `lookY`
- `orbit`

`transitionToAnimation(...)` updates the active camera target, and `updateCamera(...)` smoothly interpolates toward it. This gives each move a more useful viewing angle without changing the underlying movement system.

### 7. UI State And Render Cycle

The app uses a single mutable `state` object instead of a framework store.

Key fields include:

- `track`
- `level`
- `yogaSection`
- `routine`
- `stepIndex`
- `remaining`
- `running`
- `voiceEnabled`
- `neuralPoseEnabled`
- `mirrorGuideEnabled`
- `hasUserInteracted`

#### UI flow

- `init()` reads URL params, builds the initial routine, binds events, renders the first step, and then sets up the scene
- `renderStep()` is the main synchronization function
- `renderStep()` updates text, instructions, timer metadata, progress, selected buttons, and the current animation target
- timer progression is handled by `startTimer()`, `tick()`, `goNext()`, `pauseTimer()`, and `resetSession()`
- breathing phases are derived from each step's `breathPattern` and rendered into the timer metadata

This is a small but effective architecture for a static app: mutate state, then re-render the affected UI from the current state.

### 8. Voice Cue Pipeline

Voice guidance uses the browser speech engine:

- `loadVoices()` discovers available voices
- `pickVoice()` prefers natural English voices when possible
- `primeSpeech()` warms the engine after user interaction
- `speak(text)` handles the actual utterance playback

Voice output is gated behind user interaction because browsers typically block autoplay speech. Track configuration also supplies voice rate, pitch, volume, and stock cue copy.

### 9. Neural Pose Overlay

The AI pose guide is optional and off by default.

#### Overlay lifecycle

- `ensurePoseOverlay(stageEl)` creates the overlay canvas and status badge
- `toggleNeuralPose()` controls visibility and lazy initialization
- `initNeuralPose()` loads MediaPipe and creates a `PoseLandmarker`
- `updateNeuralPose(nowMs)` samples the rendered avatar frame on a throttle
- `drawNeuralPose()` renders either ML landmarks or a projection fallback

#### Fallback strategy

If MediaPipe is unavailable, not yet ready, or temporarily loses landmarks, the app falls back to a projected overlay generated from the avatar's current 3D joint positions:

- `projectFromObject(...)`
- `drawProjectedPose()`

That fallback is important because it keeps the overlay feature useful even when the ML path is offline.

## State And Data Flow

The most important runtime path is:

1. A user action changes track, level, playback, voice, pose overlay, or step index
2. The app mutates `state`
3. The app rebuilds session data if needed
4. `renderStep()` updates the DOM and animation target
5. The Three.js loop keeps rendering the avatar continuously
6. The timer loop advances steps once playback starts

This separation works well here:

- discrete app events update the session model
- continuous rendering updates the avatar and overlay

## URL Parameters

The app supports lightweight deep linking through query params:

- `track=exercise|yoga|dance|breath`
- `level=beginner|advanced`
- `section=flow|relax`
- `step=<zero-based-index>`
- `mirror=on|off`
- `guide=on|off`

Example:

```text
index.html?track=yoga&section=flow&level=advanced
index.html?track=yoga&section=relax&level=advanced
index.html?track=breath&level=advanced
```

## External Tutorial Media

The breathing exercise guide is populated from `BREATH_TUTORIAL` in `script.js`.
It references Cleveland Clinic and NHS pages for diaphragmatic breathing and stress-relief breathing exercises.

The blood-pressure-support yoga notes are populated from `BP_YOGA_TUTORIAL` in `script.js`.
They reference NCCIH, American Heart Association, Johns Hopkins Medicine, and Mayo Clinic Health System guidance for gentle yoga, activity, stress reduction, and avoiding breath-holding strain.

## Deployment Model

This project is a static site. You can run it from any simple web server.

Examples:

```bash
python3 -m http.server 8000
```

or

```bash
npx serve .
```

Because the app loads Three.js and MediaPipe from CDNs, an internet connection is required unless those scripts are vendored locally.

## Extension Points

The cleanest ways to extend the app are:

- add a new movement track by extending `tracks`, adding a `build...Routine()` function, and creating pose keys in `P`
- add new steps to an existing track by editing the routine builder output
- add tutorial media by extending `BREATH_TUTORIAL` or `BP_YOGA_TUTORIAL`
- refine animation quality by adjusting pose keyframes or camera presets
- change coaching tone by editing the track voice config and prompts
- replace the procedural overlay with asset-backed references in `assets/pose-reference/`
- move CDN dependencies local if offline usage matters

## Current Constraints

- single-file JavaScript architecture; no module boundaries yet
- no automated tests
- no persistence for session progress or preferences
- no backend, analytics, or authentication
- MediaPipe depends on external model and WASM downloads

For the current size of the project, that simplicity is reasonable. If the app grows, the next architectural step would be splitting `script.js` into modules such as `data`, `scene`, `animation`, `voice`, `overlay`, and `ui`.
