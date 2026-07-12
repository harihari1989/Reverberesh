

/* ═══════════════════════════════════════════════════════════
   Interactive Workout + Yoga + Breath + Dance Guide
   3D Humanoid Avatar (Three.js) with skeletal pose animation
   ═══════════════════════════════════════════════════════════ */

const DEG = Math.PI / 180;

// ─── Track definitions ───

const tracks = {
  exercise: {
    label: "Workout", heroTitle: "Move with Reverberesh",
    heroText: "I'm Reverberesh, your movement guide. Follow the avatar for steady workout cues, clear alignment reminders, and a pace that stays easy to follow.",
    goals: ["Full Body", "Steady Form", "Everyday Energy"],
    descriptions: {
      beginner: "Beginner workout keeps the timing simple and leaves a little more room to reset between moves.",
      advanced: "Advanced workout holds the rhythm a bit longer while keeping the movement smooth and controlled."
    },
    tip: "Click any step to jump there, or use Cue Me whenever you want a quick form reminder.",
    burstLabel: "Cue Me",
    notes: ["Stack the ribs over the center when you reset.", "In squats, sit back first and let the knees travel in the same direction as the toes.", "On rotations, let the head, chest, and torso turn together without leaning.", "If the movement starts to feel rushed, shorten the range and find your rhythm again."],
    prompts: ["Nice pace. Let the movement stay smooth.", "That looks strong. Keep the shoulders easy.", "Good control. Light feet and steady breath.", "Stay with that rhythm. Clean reps matter more than fast reps."],
    voice: {
      rate: 0.96,
      pitch: 0.98,
      volume: 0.95,
      intro: "Let's settle into a steady workout together.",
      pause: "Take a moment. We'll pick it back up when you're ready.",
      fiveSecond: "Five seconds. Stay with the shape.",
      finish: "Session complete. You moved really well today."
    },
  },
  yoga: {
    label: "Yoga", heroTitle: "Flow with Reverberesh",
    heroText: "I'm Reverberesh, here to guide you through a calm yoga flow with gentle pacing, simple alignment cues, and room to breathe.",
    goals: ["Balance", "Mobility", "Calm Energy"],
    descriptions: {
      beginner: "Beginner yoga keeps the holds shorter and the transitions slower so you can find each shape without rushing.",
      advanced: "Advanced yoga adds longer holds and steadier control while keeping the flow soft and clear."
    },
    tip: "Use Center Me anytime for a fresh grounding cue, then settle back into the breath.",
    burstLabel: "Center Me",
    notes: ["Root evenly through the feet before trying to deepen any standing pose.", "In Chair and Forward Fold, hinge from the hips instead of collapsing the spine.", "In Warrior II, keep the front knee stacked over the ankle rather than forcing depth.", "In Tree, place the foot on the shin or thigh and avoid pressing into the knee."],
    prompts: ["Steady breath, steady shape.", "Easy through the shoulders and long through the spine.", "That looks calm and controlled.", "Let the breath lead the pace."],
    voice: {
      rate: 0.9,
      pitch: 0.97,
      volume: 0.92,
      intro: "Take a slow breath and settle into the flow.",
      pause: "Take your time. The next pose will be here when you're ready.",
      fiveSecond: "Five seconds. Stay soft and steady.",
      finish: "Session complete. Take one more easy breath."
    },
  },
  dance: {
    label: "Dance", heroTitle: "Dance with Reverberesh",
    heroText: "I'm Reverberesh, your dance workout guide. Follow the rhythm with easy-to-read steps, relaxed cues, and a full-body avatar that keeps the movement flowing.",
    goals: ["Rhythm", "Cardio Flow", "Coordination"],
    descriptions: {
      beginner: "Beginner dance keeps the combinations short and repeatable so you can find the groove before adding speed.",
      advanced: "Advanced dance links the moves together longer with a brighter rhythm while keeping the steps light and clear."
    },
    tip: "Tap any step to jump in, or use Keep Me Moving when you want a fresh rhythm cue.",
    burstLabel: "Keep Me Moving",
    notes: ["Let the knees stay soft so the movement feels springy instead of stiff.", "Place the feet under you before changing direction.", "Lead with the chest and let the arms follow naturally.", "If you lose the pattern, come back to the bounce and rejoin on the next count."],
    prompts: ["Nice groove. Keep it loose through the shoulders.", "Let the step travel. You're right on it.", "Good rhythm. Light feet, easy breath.", "Stay relaxed and let the arms swing naturally."],
    voice: {
      rate: 1.0,
      pitch: 1.02,
      volume: 0.96,
      intro: "Let's find an easy groove and build from there.",
      pause: "Take a breather. We'll come back in on the beat.",
      fiveSecond: "Five seconds. Keep the bounce.",
      finish: "Session complete. Nice flow."
    },
  },
  breath: {
    label: "Breathing Exercise", heroTitle: "Breathing Exercise with Reverberesh",
    heroText: "I'm Reverberesh, here to guide inhale, hold, exhale, hold breathing with a clear pose view, airflow arrows, and selectable timing.",
    goals: ["Inhale", "Hold", "Exhale", "Hold"],
    descriptions: {
      beginner: "Beginner breathing uses short four-part cycles so the arrow direction and hold cues stay easy to follow.",
      advanced: "Advanced breathing uses longer four-part cycles while keeping the pose, arrows, and airflow direction clear."
    },
    tip: "Follow the cue box on the pose: inhale with the upward arrow, hold softly, exhale with the downward arrow, then hold softly again.",
    burstLabel: "Guide Breathing",
    notes: ["Breathe comfortably and keep the jaw, eyes, and shoulders relaxed.", "Let the inhale follow the upward arrow without lifting the shoulders.", "Hold softly without bracing.", "Let the exhale follow the downward arrow without forcing.", "Return to normal breathing if you feel light-headed."],
    prompts: ["Inhale with the upward arrow.", "Hold softly.", "Exhale with the downward arrow.", "Hold softly again."],
    voice: {
      rate: 0.86,
      pitch: 0.95,
      volume: 0.9,
      intro: "Watch the cue box on the pose. Inhale with the upward arrow, hold, exhale with the downward arrow, then hold again.",
      pause: "Paused. Let your breath return to normal.",
      fiveSecond: "Five seconds. Finish softly.",
      finish: "Breathing exercise complete. Notice the quieter pace before you move on."
    },
  },
};

const yogaSections = {
  flow: {
    label: "Yoga",
  },
  relax: {
    label: "Yoga Relaxation",
    heroTitle: "Blood Pressure Support with Reverberesh",
    heroText: "I'm Reverberesh, guiding a quiet restorative yoga section tuned for stress reduction: slow exhales, supported shapes, no breath holds, and a long Shavasana finish.",
    goals: ["Blood Pressure Support", "Slow Exhale", "Low Strain"],
    descriptions: {
      beginner: "Beginner relaxation uses supported holds, longer exhales, and easy transitions so the body can downshift without strain.",
      advanced: "Advanced relaxation extends the supported holds for a deeper wind-down while keeping the breath smooth and every pose easy to leave."
    },
    tip: "Keep effort below a conversational pace. Do not hold your breath, strain, or stay in any pose that creates dizziness, head pressure, chest discomfort, or shortness of breath.",
    burstLabel: "Relax Cue",
    notes: ["This routine supports stress reduction; it is not a replacement for blood pressure medication, monitoring, or medical care.", "Use slow nasal or pursed-lip breathing with a longer exhale and no breath retention.", "Keep the head supported in forward folds and use legs on a chair instead of a steep inversion if blood pressure is uncontrolled or you feel head pressure.", "Skip any pose that causes dizziness, chest pain, severe headache, shortness of breath, or a racing heartbeat."],
    prompts: ["Long exhale, soft face.", "No breath holding or bracing.", "Use support and keep effort low.", "Come out slowly if anything feels pressured."],
    voice: {
      intro: "Set up your supports and move slowly. Keep the breath smooth with no holds or strain.",
      fiveSecond: "Five seconds. Leave the pose gently and keep breathing.",
      finish: "Relaxation complete. Take your time before sitting up."
    },
  },
};

const BREATH_OPTIONS = {
  easy: {
    label: "Easy",
    title: "Easy Box Breathing",
    target: "3 / 3 / 3 / 3",
    counts: [3, 3, 3, 3],
    note: "Short sides for learning inhale, hold, exhale, hold.",
  },
  classic: {
    label: "Classic",
    title: "Classic Box Breathing",
    target: "4 / 4 / 4 / 4",
    counts: [4, 4, 4, 4],
    note: "The standard equal-count inhale, hold, exhale, hold pattern.",
  },
  deep: {
    label: "Deep",
    title: "Deep Box Breathing",
    target: "5 / 5 / 5 / 5",
    counts: [5, 5, 5, 5],
    note: "A longer equal-count option for a slower rhythm.",
  },
  advanced: {
    label: "Advanced",
    title: "Advanced Box Breathing",
    target: "6 / 6 / 6 / 6",
    counts: [6, 6, 6, 6],
    note: "Longer equal sides for experienced, unstrained breathwork.",
  },
};
const BREATH_OPTION_ORDER = ["easy", "classic", "deep", "advanced"];

const BREATH_TUTORIAL = {
  label: "Breathing timer",
  title: "Breathing exercises with airflow arrows",
  kicker: "Inhale - hold - exhale - hold",
  summary: "The breathing track follows a four-part pattern: inhale, hold, exhale, hold. The cue box sits on the pose and shows an upward arrow for inhale and a downward arrow for exhale.",
  steps: [
    { name: "Easy timing", breath: "3 / 3 / 3 / 3", cue: "Short sides for learning inhale, hold, exhale, hold." },
    { name: "Classic timing", breath: "4 / 4 / 4 / 4", cue: "Equal sides with visible upward and downward airflow arrows." },
    { name: "Deep timing", breath: "5 / 5 / 5 / 5", cue: "Use longer sides only when the four-count version feels easy." },
    { name: "Advanced timing", breath: "6 / 6 / 6 / 6", cue: "Use this only when every hold stays soft and unforced." },
  ],
  media: [
    { type: "reference", title: "Diaphragmatic breathing guide", source: "Cleveland Clinic", url: "https://my.clevelandclinic.org/health/articles/diaphragmatic-breathing" },
    { type: "reference", title: "Breathing exercises for stress", source: "NHS", url: "https://www.nhs.uk/conditions/stress-anxiety-depression/ways-relieve-stress/" },
  ],
};

const BP_YOGA_TUTORIAL = {
  label: "Blood pressure support",
  title: "Blood-pressure-friendly yoga notes",
  kicker: "Low strain",
  summary: "This relaxation section is written as a gentle stress-reduction aid: supported poses, longer exhales, no breath holds, and slow transitions. It should be used alongside professional blood pressure care, not instead of it.",
  steps: [
    { name: "Keep intensity low", breath: "Conversational effort", cue: "Use enough support that you can breathe and speak without strain. Come out before a pose becomes effortful." },
    { name: "Use longer exhales", breath: "4 in / 6 out", cue: "Inhale quietly, then exhale longer through the nose or pursed lips. Skip any count that feels forced." },
    { name: "Modify inversions", breath: "Legs supported", cue: "Prefer legs on a chair or a gentle wall setup. Stop if you feel head pressure, dizziness, or eye pressure." },
    { name: "Avoid bracing", breath: "No holds", cue: "Do not lock the breath, clench the jaw, or push into deep folds or backbends." },
  ],
  media: [
    { type: "reference", title: "Yoga and hypertension evidence", source: "NCCIH", url: "https://www.nccih.nih.gov/health/providers/digest/complementary-health-approaches-for-hypertension-science" },
    { type: "reference", title: "Activity and breath control for high blood pressure", source: "American Heart Association", url: "https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/getting-active-to-control-high-blood-pressure" },
    { type: "reference", title: "Deep breathing benefits and cautions", source: "American Heart Association", url: "https://www.heart.org/en/healthy-living/healthy-lifestyle/stress-management" },
    { type: "reference", title: "Yoga and heart health", source: "Johns Hopkins Medicine", url: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/the-yoga-heart-connection" },
    { type: "reference", title: "Avoid breath holding in static exercise", source: "Mayo Clinic Health System", url: "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/isometric-exercise-and-blood-pressure" },
  ],
};

// ─── Routine builders ───

function move(o) { return { type: "movement", ...o }; }
function rest(duration, focus, summary, instructions, cues) {
  return { type: "rest", name: "Reset", duration, target: `${duration} sec reset`, animation: "rest", focus, summary, instructions, cues, period: 2.4 };
}
function phase(label, duration, cue, key) { return { label, duration, cue, key: key || label.toLowerCase() }; }
function selectedBreathOption(key) {
  const optionKey = BREATH_OPTIONS[key] ? key : "classic";
  return { key: optionKey, ...BREATH_OPTIONS[optionKey] };
}
function timingLabel(counts) { return counts.join(" / "); }
function breathPattern(counts) {
  const [inhale, topHold, exhale, bottomHold] = counts;
  return [
    { label: "Inhale", duration: inhale, cue: "Inhale with the upward arrow.", key: "inhale" },
    { label: "Hold", duration: topHold, cue: "Hold softly without tightening the throat or jaw.", key: "hold" },
    { label: "Exhale", duration: exhale, cue: "Exhale with the downward arrow.", key: "exhale" },
    { label: "Hold", duration: bottomHold, cue: "Hold softly again before the next inhale.", key: "rest" },
  ];
}
function boxStep({ name, counts, cycles, focus, summary, instructions, cues, period = 2.6 }) {
  const pattern = breathPattern(counts);
  const duration = pattern.reduce((sum, item) => sum + item.duration, 0) * cycles;
  const target = timingLabel(counts);
  return move({
    name, duration, target, animation: "box-breath", focus, summary, instructions, cues, period,
    breathPattern: pattern, boxGuide: true,
  });
}

function buildExerciseRoutine(level) {
  const adv = level === "advanced";
  return [
    move({ name: "March + Reach", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec pace`, animation: "march", focus: "Warm the whole body and lift posture", summary: "March with light feet and an easy overhead reach.", instructions: ["Stand tall and let the opposite arm rise as each knee lifts.", "Land softly and keep the chest easy and open.", "Stay with a pace that feels smooth instead of rushed."], cues: ["Stay long through the spine.", "Reach up without tightening the neck.", "Light feet, easy breath."], period: adv ? 0.95 : 1.05 }),
    move({ name: "Side Step Pull", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec pace`, animation: "side-step", focus: "Lateral movement and upper-back activation", summary: "Step side to side and let the elbows sweep back to open the chest.", instructions: ["Step out to one side and draw both elbows back.", "Return through center before changing sides.", "Keep the shoulders low and the movement relaxed."], cues: ["Lead from the upper back.", "Move smoothly side to side.", "Stay broad across the chest."], period: adv ? 1.05 : 1.12 }),
    move({ name: "Bodyweight Squat", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec pace`, animation: "squat", focus: "Leg drive and upright squat mechanics", summary: "Sit back first, squat with a long spine, and stand up smoothly.", instructions: ["Set the feet slightly wider than hip-width.", "Brace gently and send the hips back before the knees bend.", "Push through the whole foot to stand tall again."], cues: ["Sit back first.", "Knees follow the toes.", "Keep the spine long."], period: adv ? 1.2 : 1.28 }),
    rest(adv ? 12 : 15, "Breathing reset", "Slow the breath and prepare for rotation.", ["Take one full exhale and let the shoulders soften.", "Stand tall with the center lightly awake.", "Get ready to turn without leaning."], ["Recover without slumping.", "Relax the jaw.", "Find your rhythm again."]),
    move({ name: "Standing Trunk Rotation", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec pace`, animation: "rotation", focus: "Core control and upright rotation", summary: "Turn through the torso while staying tall and easy.", instructions: ["Hold the hands near chest height.", "Rotate the head, chest, and torso together.", "Keep the weight even through both feet."], cues: ["Stay tall through the middle.", "Move as one piece.", "Keep the shoulders easy."], period: adv ? 1.05 : 1.12 }),
    move({ name: "Boxer Punches", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec pace`, animation: "punch", focus: "Cardio rhythm and upper-body drive", summary: "Bounce lightly and alternate quick, clean punches.", instructions: ["Use a soft athletic stance.", "Punch forward with a quick reach and return.", "Let the shoulders stay loose while the center stays steady."], cues: ["Quick hands, easy shoulders.", "Stay light through the feet.", "Keep the breath steady."], period: adv ? 0.82 : 0.9 }),
    rest(adv ? 12 : 15, "Quick recovery", "Ease the breathing down.", ["Release the hands and let the breath deepen.", "Reset the shoulders and soften the face.", "Stand ready for the final block."], ["Take a breath.", "Stand tall again.", "Easy reset."]),
    move({ name: "Posture Pull-Opens", duration: adv ? 35 : 30, target: `${adv ? 35 : 30} sec pace`, animation: "posture", focus: "Open chest and upper-back activation", summary: "Reach forward, then open the arms wide and pause for a breath.", instructions: ["Reach the hands forward, then sweep the arms out and back.", "Pause briefly as the shoulder blades draw together.", "Keep the neck relaxed and the ribs soft."], cues: ["Open wide through the collarbones.", "Squeeze gently between the shoulder blades.", "Finish each rep tall."], period: adv ? 1.25 : 1.3 }),
  ];
}

function fitBreathingRoutineDuration(steps, minutes = 5) {
  const safeMinutes = Math.max(2, Math.min(60, Math.round(Number(minutes) || 5)));
  const targetSeconds = safeMinutes * 60;
  const originalTotal = steps.reduce((sum, item) => sum + item.duration, 0) || targetSeconds;
  const cycles = steps.map(item => Math.max(1, item.breathPattern?.reduce((sum, phaseItem) => sum + phaseItem.duration, 0) || 1));
  const ideals = steps.map(item => targetSeconds * (item.duration / originalTotal));

  let states = new Map([[0, { cost: 0, counts: [] }]]);
  steps.forEach((item, index) => {
    const cycle = cycles[index];
    const nextStates = new Map();
    states.forEach((entry, usedSeconds) => {
      for (let count = 1; usedSeconds + count * cycle <= targetSeconds; count++) {
        const duration = count * cycle;
        const total = usedSeconds + duration;
        const cost = entry.cost + Math.pow(duration - ideals[index], 2);
        const existing = nextStates.get(total);
        if (!existing || cost < existing.cost) nextStates.set(total, { cost, counts: [...entry.counts, count] });
      }
    });
    states = nextStates;
  });

  const exact = states.get(targetSeconds);
  const fallbackSeconds = Math.max(...states.keys());
  const allocation = exact || states.get(fallbackSeconds);
  return steps.map((item, index) => ({ ...item, duration: allocation.counts[index] * cycles[index] }));
}

function buildBreathingRoutine(level, optionKey = "classic", sessionMinutes = 5) {
  const adv = level === "advanced";
  const option = selectedBreathOption(optionKey);
  const easy = selectedBreathOption("easy");
  const selectedCounts = option.counts;
  const holdCounts = [selectedCounts[0], Math.min(selectedCounts[1] + 2, 8), selectedCounts[2], Math.min(selectedCounts[3] + 2, 8)];
  const enduranceCounts = selectedCounts.map(count => Math.min(count + 1, 7));
  const natural = breathPattern([4, 4, 4, 4]);

  if (adv) {
    return fitBreathingRoutineDuration([
      move({ name: "Arrow Breathing Setup", duration: 64, target: "4 / 4 / 4 / 4", animation: "belly-breath", focus: "Watch the arrow cue on the pose", summary: "The cue box sits on Reverberesh's breathing pose and shows airflow direction with arrows.", instructions: ["Inhale with the upward arrow.", "Hold softly with no arrow movement.", "Exhale with the downward arrow, then hold softly again."], cues: ["Inhale.", "Hold.", "Exhale.", "Hold."], period: 3.0, breathPattern: natural, boxGuide: true }),
      boxStep({ name: `${option.label} Box Breathing`, counts: selectedCounts, cycles: 5, focus: "Inhale, hold, exhale, hold", summary: `Use the ${option.target} timing option while the cue box on the pose moves through the four-part pattern.`, instructions: [`Inhale for ${selectedCounts[0]} seconds with the upward arrow.`, `Hold softly for ${selectedCounts[1]} seconds.`, `Exhale for ${selectedCounts[2]} seconds with the downward arrow, then hold for ${selectedCounts[3]} seconds.`], cues: ["Inhale with the upward arrow.", "Hold softly.", "Exhale with the downward arrow.", "Hold softly."] }),
      boxStep({ name: "Advanced Hold Box", counts: holdCounts, cycles: 5, focus: "Longer holds with clear inhale and exhale", summary: "Lengthen both holds while keeping the inhale and exhale smooth and unforced.", instructions: [`Inhale for ${holdCounts[0]} seconds.`, `Hold softly for ${holdCounts[1]} seconds.`, `Exhale for ${holdCounts[2]} seconds, then hold for ${holdCounts[3]} seconds.`], cues: ["Inhale.", "Hold without bracing.", "Exhale.", "Hold softly."], period: 2.7 }),
      boxStep({ name: "Endurance Box Breathing", counts: enduranceCounts, cycles: 4, focus: "Longer equal sides", summary: "Practice a longer equal-sided box only while the breath stays calm and controlled.", instructions: [`Inhale for ${enduranceCounts[0]} seconds without filling to maximum.`, `Hold for ${enduranceCounts[1]} seconds with a relaxed face.`, `Exhale for ${enduranceCounts[2]} seconds, then hold for ${enduranceCounts[3]} seconds.`], cues: ["Inhale.", "Hold.", "Exhale.", "Hold."] }),
      move({ name: "Quiet Box Breathing", duration: 64, target: "4 / 4 / 4 / 4", animation: "box-breath", focus: "Return to a calm four-part pattern", summary: "Stay with the pose, arrows, and soft holds as the practice finishes.", instructions: ["Inhale with the upward arrow.", "Hold softly.", "Exhale with the downward arrow, then hold softly again."], cues: ["Inhale.", "Hold.", "Exhale.", "Hold."], period: 3.0, breathPattern: natural, boxGuide: true }),
    ], sessionMinutes);
  }

  return fitBreathingRoutineDuration([
    move({ name: "Arrow Breathing Setup", duration: 48, target: "4 / 4 / 4 / 4", animation: "belly-breath", focus: "Watch the arrow cue on the pose", summary: "The cue box sits on Reverberesh's breathing pose and shows airflow direction with arrows.", instructions: ["Inhale with the upward arrow.", "Hold softly with no arrow movement.", "Exhale with the downward arrow, then hold softly again."], cues: ["Inhale.", "Hold.", "Exhale.", "Hold."], period: 3.0, breathPattern: natural, boxGuide: true }),
    boxStep({ name: "Easy Box Breathing", counts: easy.counts, cycles: 6, focus: "Learn inhale, hold, exhale, hold", summary: "Use a short three-count box so the four-part pattern is obvious.", instructions: ["Inhale for 3 seconds with the upward arrow.", "Hold softly for 3 seconds.", "Exhale for 3 seconds with the downward arrow, then hold for 3 seconds."], cues: ["Inhale with the upward arrow.", "Hold softly.", "Exhale with the downward arrow.", "Hold softly."] }),
    boxStep({ name: `${option.label} Box Breathing`, counts: selectedCounts, cycles: 6, focus: "Use your selected timing option", summary: `Practice the ${option.target} timing option: ${option.note}`, instructions: [`Inhale for ${selectedCounts[0]} seconds.`, `Hold for ${selectedCounts[1]} seconds.`, `Exhale for ${selectedCounts[2]} seconds, then hold for ${selectedCounts[3]} seconds.`], cues: ["Inhale.", "Hold.", "Exhale.", "Hold."] }),
    boxStep({ name: "Repeat Box Breathing", counts: selectedCounts, cycles: 6, focus: "Repeat the same four-part cue", summary: "Stay with the same timing while the box near Reverberesh tells you inhale, hold, exhale, hold.", instructions: [`Inhale smoothly for ${selectedCounts[0]} seconds.`, `Hold softly for ${selectedCounts[1]} seconds.`, `Exhale evenly for ${selectedCounts[2]} seconds, then hold for ${selectedCounts[3]} seconds.`], cues: ["Inhale.", "Hold.", "Exhale.", "Hold."], period: 2.7 }),
    move({ name: "Quiet Box Breathing", duration: 48, target: "4 / 4 / 4 / 4", animation: "box-breath", focus: "Return to a calm four-part pattern", summary: "Let the counts fade but keep watching the cue box and airflow arrows.", instructions: ["Inhale with the upward arrow.", "Hold softly.", "Exhale with the downward arrow, then hold softly again."], cues: ["Inhale.", "Hold.", "Exhale.", "Hold."], period: 3.0, breathPattern: natural, boxGuide: true }),
  ], sessionMinutes);
}

function buildYogaRoutine(level) {
  if (state?.yogaSection === "relax") return buildYogaRelaxationRoutine(level);
  const adv = level === "advanced";
  const coreFlow = [
    move({ name: "Mountain Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "mountain", focus: "Root through the feet and stack the body", summary: "Stand grounded and long through the spine.", instructions: ["Press evenly through the feet.", "Soften the ribs and widen across the collarbones.", "Let the crown of the head rise over the center of the body."], cues: ["Root down and grow tall.", "Shoulders easy, ribs soft.", "Stand long through the whole body."], period: adv ? 2.7 : 2.8 }),
    move({ name: "Sun Reach Flow", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec flow`, animation: "sun", focus: "Length through the front body", summary: "Sweep the arms wide and overhead with the breath.", instructions: ["Inhale the arms up in a wide arc.", "Exhale and let them float back down.", "Keep the neck easy and the spine long."], cues: ["Move with the breath.", "Reach long without strain.", "Keep the neck soft."], period: adv ? 1.9 : 2 }),
    move({ name: "Chair Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "chair", focus: "Hip hinge and leg strength", summary: "Sit back as if reaching for a chair and keep the spine long.", instructions: ["Bend the knees and send the hips back.", "Reach the arms up without tightening the neck.", "Keep the weight balanced through the whole foot."], cues: ["Sit back gently.", "Knees follow the toes.", "Keep the spine long."], period: adv ? 1.8 : 1.9 }),
    move({ name: "Low Lunge", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec hold`, animation: "low-lunge", focus: "Front-leg stability and hip flexor length", summary: "Step one foot forward, bend the front knee, and lift through the chest.", instructions: ["Keep the front knee stacked over the ankle.", "Let the back leg reach long without dropping the chest.", "Reach upward only as far as the ribs can stay soft."], cues: ["Front knee over ankle.", "Back leg long.", "Lift the chest, soften the ribs."], period: adv ? 1.8 : 1.9 }),
    move({ name: "Warrior II", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec hold`, animation: "warrior", focus: "Wide stance and front-knee alignment", summary: "Take a wide stance and reach calmly in both directions.", instructions: ["Open into a wide stance.", "Bend the front knee over the ankle.", "Reach through both arms while keeping the neck easy."], cues: ["Front knee stays over the ankle.", "Arms long, shoulders soft.", "Stay broad across the chest."], period: adv ? 1.7 : 1.8 }),
    move({ name: "Triangle Pose", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec hold`, animation: "triangle", focus: "Side-body length and open chest", summary: "Reach over the front leg and stack the arms with a long spine.", instructions: ["Lengthen forward before tipping sideways.", "Keep both legs active with a soft micro-bend.", "Turn the chest open without forcing the neck."], cues: ["Lengthen first.", "Stack the chest gently.", "Keep both feet grounded."], period: adv ? 1.9 : 2 }),
    rest(15, "Breathing reset", "Come back to center.", ["Bring the feet under the hips.", "Take a slow breath.", "Get ready to lengthen sideways."], ["Let the breath settle.", "Stand tall again.", "Move slowly."]),
    move({ name: "Standing Side Stretch", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec flow`, animation: "side-stretch", focus: "Length through the side ribs", summary: "Reach high before bending so the stretch comes from length.", instructions: ["Lift tall before you arc.", "Keep both feet grounded.", "Return through center slowly."], cues: ["Length first, then bend.", "Keep both feet heavy.", "Breathe into the side ribs."], period: adv ? 1.9 : 1.95 }),
    move({ name: "Tree Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "tree", focus: "Balance and a steady center", summary: "Balance calmly with the foot resting on the shin or thigh.", instructions: ["Press foot into leg and leg into foot.", "Skip the knee joint.", "Let the gaze settle on one point."], cues: ["Steady gaze, steady breath.", "Keep the standing leg strong.", "Grow tall through the center."], period: adv ? 2.4 : 2.5 }),
    move({ name: "Warrior III Balance", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "warrior-three", focus: "Single-leg balance and long back line", summary: "Hinge forward from one hip and reach back through the lifted leg.", instructions: ["Keep the standing knee softly bent.", "Reach the crown of the head and back heel in opposite directions.", "Square the hips toward the floor as much as feels steady."], cues: ["Long line, soft knee.", "Hips level.", "Steady gaze."], period: adv ? 2.1 : 2.2 }),
    move({ name: "Standing Forward Bend", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "fold", focus: "Hip hinge and back-body release", summary: "Fold by hinging at the hips, knees soft.", instructions: ["Stand with feet parallel, hinge forward.", "Bend knees as needed.", "Let the head release."], cues: ["Hinge at the hips.", "Soften the knees.", "Let the neck release."], period: adv ? 2.1 : 2.2 }),
    move({ name: "Wide-Leg Forward Fold", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "wide-fold", focus: "Hamstrings, hips, and calm release", summary: "Take the feet wide and fold with a long spine and relaxed neck.", instructions: ["Step the feet wide and keep both knees soft.", "Hinge from the hips before letting the head drop.", "Let the arms hang heavy without pulling."], cues: ["Wide base, soft knees.", "Hinge before rounding.", "Let the neck go."], period: adv ? 2.2 : 2.3 }),
    move({ name: "Seated Breath Reset", duration: adv ? 30 : 25, target: `${adv ? 30 : 25} sec hold`, animation: "seated", focus: "Seated upright cooldown", summary: "Sit tall in cross-legged shape, quiet breath.", instructions: ["Sit evenly through sitting bones.", "Rest hands on knees.", "Let breathing slow down."], cues: ["Sit tall without stiffness.", "Relax shoulders and jaw.", "Let the breath settle."], period: adv ? 2.8 : 2.9 }),
  ];
  return coreFlow;
}

function buildYogaRelaxationRoutine(level) {
  const adv = level === "advanced";
  const hold = (low, high = low) => adv ? high : low;
  const pressureBreath = [
    phase("Inhale", 4, "Breathe in quietly without filling to the maximum.", "inhale"),
    phase("Exhale", 6, "Exhale longer and let the jaw, shoulders, and belly soften.", "exhale"),
  ];

  return [
    move({ name: "Sukhasana + Slow Exhale Breathing", duration: 180, target: "3 min 4-in / 6-out", animation: "sukhasana-breath", focus: "Blood-pressure support through slow exhale breathing", summary: "Start in an easy seated base and use a longer exhale to help the body settle without breath holding.", instructions: ["Sit on a folded blanket or cushion so the hips can relax.", "Rest the hands on the thighs and keep the spine tall without stiffness.", "Inhale for 4 seconds and exhale for 6 seconds; skip the count if it feels forced."], cues: ["No breath holds.", "Long exhale, soft jaw.", "Let the exhale settle you."], period: 3, breathPattern: pressureBreath }),
    move({ name: "Supported Balasana / Child Pose", duration: hold(90, 120), target: `${adv ? "2 min" : "90 sec"} supported release`, animation: "child-pose", focus: "Stress release with head and chest supported", summary: "Fold into Child Pose with enough support that the head, chest, and breath stay easy.", instructions: ["Bring the knees only as wide as feels comfortable.", "Rest the torso and forehead on a pillow, bolster, or stacked cushions.", "Keep breathing with a longer exhale and come up if you feel head pressure."], cues: ["Support the head.", "Keep the knees comfortable.", "Exhale without pushing."], period: 3.1, breathPattern: pressureBreath }),
    move({ name: "Supported Vajrasana", duration: hold(60, 120), target: `${adv ? "2 min" : "1 min"} easy seat`, animation: "vajrasana", focus: "Quiet upright posture without knee strain", summary: "Sit back in a supported kneeling shape only if the knees and ankles feel comfortable.", instructions: ["Place a blanket or cushion between the seat and heels if needed.", "Keep the spine tall, belly soft, and shoulders relaxed.", "Skip this pose entirely if the knees hurt or the breath becomes strained."], cues: ["Skip if knees hurt.", "No bracing.", "Relax the shoulders."], period: 3, breathPattern: pressureBreath }),
    move({ name: "Supported Baddha Konasana / Butterfly", duration: hold(120, 180), target: `${adv ? "3 min" : "2 min"} supported hip opener`, animation: "butterfly", focus: "Gentle hips with low effort and steady breath", summary: "Bring the soles together and support the knees so the hips can release without pushing.", instructions: ["Sit on support if the low back rounds.", "Place cushions under the knees if the inner thighs pull.", "Keep the spine tall, shoulders easy, and exhale longer than you inhale."], cues: ["Support the knees.", "No pushing the hips.", "Long, easy exhale."], period: 3, breathPattern: pressureBreath }),
    move({ name: "Supported Paschimottanasana", duration: hold(90, 120), target: `${adv ? "2 min" : "90 sec"} supported fold`, animation: "supported-forward-fold", focus: "Forward fold with the head supported", summary: "Fold forward only with support so the spine, head, and breath stay comfortable.", instructions: ["Place a cushion, bolster, or folded blanket on the legs.", "Hinge forward only until the body can rest without pulling.", "Keep the head supported and come up if you feel pressure in the head, eyes, or chest."], cues: ["Head supported.", "Do not force depth.", "Keep breathing."], period: 3.2, breathPattern: pressureBreath }),
    move({ name: "Gentle Viparita Karani / Legs Supported", duration: hold(180, 240), target: `${adv ? "4 min" : "3 min"} legs supported`, animation: "legs-up-wall", focus: "Restful leg elevation without a steep inversion", summary: "Rest with the legs on a chair or gently up a wall, keeping the hips, low back, and head comfortable.", instructions: ["Use a chair under the calves or move farther from the wall for a milder angle.", "Keep the head, neck, and chest relaxed with no pressure behind the eyes.", "Skip this pose if blood pressure is uncontrolled, you feel dizzy, or inversions are not recommended for you."], cues: ["Use a chair if needed.", "No head pressure.", "Let the legs feel supported."], period: 3.4, breathPattern: pressureBreath }),
    move({ name: "Low Setu Bandhasana / Supported Bridge", duration: hold(30, 45), target: `${adv ? "45 sec" : "30 sec"} low supported bridge`, animation: "supported-bridge", focus: "Very gentle supported chest opening", summary: "Use a low cushion or block under the pelvis and avoid turning the pose into an intense backbend.", instructions: ["Lie back with knees bent and feet grounded.", "Lift the hips just enough to place low support under the pelvis.", "Keep the throat, face, and belly relaxed; leave the pose if the breath or pressure changes."], cues: ["Keep support low.", "Avoid intense backbend.", "No breath holding."], period: 3, breathPattern: pressureBreath }),
    move({ name: "Extended Shavasana", duration: hold(300, 420), target: `${adv ? "7 min" : "5 min"} final rest`, animation: "shavasana", focus: "Full-body relaxation and nervous-system downshift", summary: "Finish with a longer supported rest so the practice can settle before you sit up.", instructions: ["Lie comfortably with support under the knees, head, or arms if helpful.", "Let the feet, hands, belly, and face become heavy.", "Breathe normally or use the 4-in, 6-out rhythm until the timer ends, then roll to the side before sitting."], cues: ["Let the whole body release.", "Slow exhale, no effort.", "Rise slowly at the end."], period: 3.6, breathPattern: pressureBreath }),
  ];
}

function buildDanceRoutine(level) {
  const adv = level === "advanced";
  return [
    move({ name: "Bounce Step Warmup", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec groove`, animation: "dance-bounce", focus: "Find the beat and wake up the whole body", summary: "Keep a light bounce under you and let the arms swing naturally.", instructions: ["Keep the knees soft and let the weight shift side to side.", "Add an easy arm swing that follows the step.", "Stay lifted through the chest without forcing it."], cues: ["Soft knees, light bounce.", "Let the arms move naturally.", "Keep the shoulders loose."], period: adv ? 1.0 : 1.08 }),
    move({ name: "Step Touch Sweep", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec groove`, animation: "step-touch", focus: "Easy lateral rhythm and shoulder release", summary: "Step out, touch in, and sweep the arms across the body.", instructions: ["Step out and let the other foot tap in.", "Sweep the arms across the body, then open them back out.", "Keep the movement easy and springy."], cues: ["Step out, touch in.", "Let the arms follow the step.", "Keep the bounce alive."], period: adv ? 1.08 : 1.14 }),
    move({ name: "Grapevine Glide", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec groove`, animation: "grapevine", focus: "Travel side to side with relaxed coordination", summary: "Cross behind lightly and let the upper body follow the direction of travel.", instructions: ["Step to the side, cross one foot lightly behind, and step out again.", "Travel only as far as you can stay smooth.", "Let the torso follow the direction of travel."], cues: ["Keep the steps light.", "Turn with the movement.", "Stay easy through the upper body."], period: adv ? 1.0 : 1.08 }),
    rest(adv ? 12 : 15, "Breathing reset", "Come back to the bounce and reset the pattern.", ["March or sway in place.", "Let the breath settle.", "Get ready for the next phrase."], ["Keep it easy.", "Find the beat again.", "Relax the shoulders."]),
    move({ name: "Cross-Body Groove", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec groove`, animation: "cross-groove", focus: "Torso rhythm and cross-body reach", summary: "Reach across the body and return with a soft rebound.", instructions: ["Reach one arm across the body as you shift weight.", "Return to center with a gentle rebound.", "Let the ribs and shoulders move together."], cues: ["Reach and rebound.", "Let the chest guide the turn.", "Keep the knees soft."], period: adv ? 1.04 : 1.1 }),
    move({ name: "Disco Reach", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec groove`, animation: "disco", focus: "Diagonal reach with playful lift", summary: "Reach one arm high on the diagonal while the other hand stays easy by the ribs.", instructions: ["Reach one arm up on the diagonal.", "Tap the opposite foot out and in.", "Switch sides with a relaxed bounce."], cues: ["Reach long on the diagonal.", "Keep the bounce underneath you.", "Stay playful, not stiff."], period: adv ? 1.02 : 1.08 }),
    move({ name: "Skater Step", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec groove`, animation: "skater", focus: "Lateral push and light cardio flow", summary: "Push gently side to side and let the back leg trail behind.", instructions: ["Push sideways off one foot and let the other leg trail behind.", "Swing the opposite arm forward naturally.", "Land quietly and keep the knees soft."], cues: ["Push and glide.", "Land softly.", "Keep the breath easy."], period: adv ? 0.92 : 0.98 }),
    move({ name: "Freestyle Finish", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec flow`, animation: "freestyle", focus: "Put the steps together and finish with flow", summary: "Mix the bounce, reach, and side step into one easy finish.", instructions: ["Keep the bounce underneath you.", "Alternate between a side step, a diagonal reach, and an easy knee lift.", "Let the movement feel playful instead of precise."], cues: ["Flow more than force.", "Keep the breath easy.", "Finish with relaxed energy."], period: adv ? 0.96 : 1.02 }),
  ];
}

function buildRoutine(t, l) {
  let built;
  if (t === "yoga") built = buildYogaRoutine(l);
  else if (t === "dance") built = buildDanceRoutine(l);
  else if (t === "breath") built = buildBreathingRoutine(l, state?.breathOption, state?.breathMinutes);
  else built = buildExerciseRoutine(l);
  const custom = (state?.customExercises || [])
    .filter(item => item.track === t && (item.level === "both" || item.level === l))
    .map(item => move({
      ...item,
      target: `${item.duration} sec ${DYNAMIC_ANIMS?.has?.(item.animation) ? "pace" : "practice"}`,
      period: item.period || 2,
      isCustom: true,
    }));
  return [...built, ...custom];
}

// ═══════════════════════════════════════════════════════════
//  3D POSE KEYFRAMES — Anatomically correct
//  Convention (all values in degrees):
//    ArmX  +  = shoulder flexion (arm forward)    -  = extension (arm back)
//    ArmZ  +  = abduction (arm away from body)    for BOTH sides
//    Elbow +  = flexion (forearm toward shoulder)  ALWAYS ≥ 0
//    LegX  +  = hip flexion (thigh forward/up)    -  = extension (thigh back)
//    LegZ  +  = abduction (leg away from body)    for BOTH sides
//    Knee  +  = flexion (shin bends back)          ALWAYS ≥ 0
//    FootX +  = toes lift up                       FootY + = optional turnout for BOTH sides
//    SpineX + = forward fold   SpineY + = turn left   SpineZ + = lean left
// ═══════════════════════════════════════════════════════════

const P = {
  _base: {
    rootY: 0, rootX: 0, rootZ: 0,
    rootRotX: 0, rootRotY: 0, rootRotZ: 0,
    spineX: 0, spineY: 0, spineZ: 0,
    headX: 0, headY: 0,
    lArmX: 0, lArmZ: 10, lElbow: 8,
    rArmX: 0, rArmZ: 10, rElbow: 8,
    lLegX: 0, lKnee: 2, lLegZ: 2,
    rLegX: 0, rKnee: 2, rLegZ: 2,
    lFootX: 0, lFootY: 0,
    rFootX: 0, rFootY: 0,
  },
};

function pose(ov) { return { ...P._base, ...ov }; }
function lotusSeat(ov = {}) {
  return pose({
    rootY: -5.55,
    lLegX: 84, lLegZ: 48, lKnee: 168, lFootX: 18, lFootY: 32,
    rLegX: 84, rLegZ: 48, rKnee: 168, rFootX: 18, rFootY: 32,
    ...ov,
  });
}

// ── Exercise ──

P.march = { speed: 1.9,
  a: pose({ rootX: -0.08, rootY: 0.18, spineX: 4, spineZ: -2, headY: -4,
    lLegX: 62, lKnee: 76, lFootX: 12,
    rLegX: -6, rKnee: 12, rFootX: 2,
    rArmX: 50, rElbow: 34, rArmZ: 12,
    lArmX: -18, lElbow: 28, lArmZ: 6 }),
  b: pose({ rootX: 0.08, rootY: 0.18, spineX: 4, spineZ: 2, headY: 4,
    rLegX: 62, rKnee: 76, rFootX: 12,
    lLegX: -6, lKnee: 12, lFootX: 2,
    lArmX: 50, lElbow: 34, lArmZ: 12,
    rArmX: -18, rElbow: 28, rArmZ: 6 }),
};

P["side-step"] = { speed: 1.4,
  a: pose({ rootX: -0.9, rootY: -0.12, spineZ: -5, headY: -6,
    lArmX: 22, lArmZ: 24, lElbow: 74,
    rArmX: 18, rArmZ: 16, rElbow: 58,
    lLegZ: 10, rLegZ: 0, lKnee: 18, rKnee: 10 }),
  b: pose({ rootX: 0.9, rootY: -0.12, spineZ: 5, headY: 6,
    lArmX: 18, lArmZ: 16, lElbow: 58,
    rArmX: 22, rArmZ: 24, rElbow: 74,
    rLegZ: 10, lLegZ: 0, lKnee: 10, rKnee: 18 }),
};

P.squat = { speed: 1.0,
  a: pose({ rootY: -0.4, spineX: 8,
    lLegX: 18, lKnee: 12,
    rLegX: 18, rKnee: 12,
    lArmX: 34, lArmZ: 24, lElbow: 18,
    rArmX: 34, rArmZ: 24, rElbow: 18 }),
  b: pose({ rootY: -2.6, spineX: 22, headX: 4,
    lLegX: 82, lKnee: 98, lLegZ: 7, lFootX: 16,
    rLegX: 82, rKnee: 98, rLegZ: 7, rFootX: 16,
    lArmX: 62, lArmZ: 24, lElbow: 16,
    rArmX: 62, rArmZ: 24, rElbow: 16 }),
};

P.rotation = { speed: 1.4,
  a: pose({ rootY: -0.1, spineY: 30, headY: 18,
    lArmX: 42, lElbow: 88, lArmZ: 8,
    rArmX: 38, rElbow: 96, rArmZ: 8 }),
  b: pose({ rootY: -0.1, spineY: -30, headY: -18,
    lArmX: 38, lElbow: 96, lArmZ: 8,
    rArmX: 42, rElbow: 88, rArmZ: 8 }),
};

P.punch = { speed: 2.6,
  a: pose({ rootX: -0.22, rootY: -0.35, spineY: -14, headY: -10,
    lArmX: 82, lArmZ: 8, lElbow: 10,
    rArmX: 36, rArmZ: 14, rElbow: 106,
    lLegX: 6, lKnee: 20,
    rLegX: -6, rKnee: 22, rFootX: 10 }),
  b: pose({ rootX: 0.22, rootY: -0.35, spineY: 14, headY: 10,
    rArmX: 82, rArmZ: 8, rElbow: 10,
    lArmX: 36, lArmZ: 14, lElbow: 106,
    rLegX: 6, rKnee: 20,
    lLegX: -6, lKnee: 22, lFootX: 10 }),
};

P.posture = { speed: 0.9,
  a: pose({ spineX: 6, headX: -2,
    lArmX: 62, lArmZ: 12, lElbow: 26,
    rArmX: 62, rArmZ: 12, rElbow: 26 }),
  b: pose({ spineX: -2, headX: 2,
    lArmX: 12, lArmZ: 68, lElbow: 12,
    rArmX: 12, rArmZ: 68, rElbow: 12 }),
};

// ── Yoga ──

P.mountain = { speed: 0.45,
  a: pose({ spineX: -1, headX: 1, lArmX: -4, rArmX: -4, lArmZ: 8, rArmZ: 8, lElbow: 6, rElbow: 6 }),
  b: pose({ rootY: 0.1, spineX: -2, headX: 0, lArmX: -2, rArmX: -2, lArmZ: 11, rArmZ: 11, lElbow: 7, rElbow: 7 }),
};

P.sun = { speed: 0.6,
  a: pose({ spineX: 2, lArmX: -8, lArmZ: 28, lElbow: 12, rArmX: -8, rArmZ: 28, rElbow: 12 }),
  b: pose({ rootY: 0.08, lArmX: 158, lArmZ: 24, lElbow: 14, rArmX: 158, rArmZ: 24, rElbow: 14, spineX: -5, headX: -4 }),
};

P.chair = { speed: 0.5,
  a: pose({ rootY: -1.45, spineX: 16, headX: 1,
    lLegX: 58, lKnee: 70, lLegZ: 6, lFootX: 10,
    rLegX: 58, rKnee: 70, rLegZ: 6, rFootX: 10,
    lArmX: 145, lArmZ: 18, lElbow: 14, rArmX: 145, rArmZ: 18, rElbow: 14 }),
  b: pose({ rootY: -2.0, spineX: 20, headX: 2,
    lLegX: 70, lKnee: 82, lLegZ: 6, lFootX: 14,
    rLegX: 70, rKnee: 82, rLegZ: 6, rFootX: 14,
    lArmX: 155, lArmZ: 18, lElbow: 12, rArmX: 155, rArmZ: 18, rElbow: 12 }),
};

P["low-lunge"] = { speed: 0.38,
  a: pose({ rootY: -1.95, spineX: -2, spineZ: -1, headX: -1, headY: 6,
    lLegX: 72, lKnee: 84, lLegZ: 3, lFootX: 10,
    rLegX: -28, rKnee: 18, rLegZ: 6, rFootX: 22,
    lArmX: 142, lArmZ: 18, lElbow: 16,
    rArmX: 142, rArmZ: 18, rElbow: 16 }),
  b: pose({ rootY: -2.1, spineX: -4, spineZ: 1, headX: -3, headY: 8,
    lLegX: 76, lKnee: 88, lLegZ: 3, lFootX: 12,
    rLegX: -32, rKnee: 20, rLegZ: 6, rFootX: 24,
    lArmX: 154, lArmZ: 18, lElbow: 12,
    rArmX: 154, rArmZ: 18, rElbow: 12 }),
};

P.warrior = { speed: 0.4,
  a: pose({ rootY: -1.0, spineX: 1, spineY: -2, spineZ: -1, headY: 20,
    lLegX: 54, lKnee: 68, lLegZ: 1, lFootY: 4,
    rLegX: -18, rKnee: 8, rLegZ: 14, rFootY: 18,
    lArmX: 4, lArmZ: 78, lElbow: 8,
    rArmX: 2, rArmZ: 82, rElbow: 8 }),
  b: pose({ rootY: -1.15, spineX: 1, spineY: -1, spineZ: 1, headY: 22,
    lLegX: 60, lKnee: 74, lLegZ: 1, lFootY: 4,
    rLegX: -18, rKnee: 8, rLegZ: 14, rFootY: 18,
    lArmX: 4, lArmZ: 82, lElbow: 6,
    rArmX: 2, rArmZ: 84, rElbow: 6 }),
};

P.triangle = { speed: 0.34,
  a: pose({ rootY: -0.55, spineX: 8, spineY: -12, spineZ: 34, headY: -12,
    lLegX: 10, lKnee: 8, lLegZ: 10, lFootY: 4,
    rLegX: -2, rKnee: 6, rLegZ: 18, rFootY: 18,
    lArmX: 8, lArmZ: 78, lElbow: 8,
    rArmX: 0, rArmZ: 80, rElbow: 8 }),
  b: pose({ rootY: -0.62, spineX: 10, spineY: -14, spineZ: 38, headY: -10,
    lLegX: 10, lKnee: 10, lLegZ: 10, lFootY: 4,
    rLegX: -2, rKnee: 6, rLegZ: 18, rFootY: 18,
    lArmX: 10, lArmZ: 80, lElbow: 6,
    rArmX: 0, rArmZ: 84, rElbow: 6 }),
};

P["side-stretch"] = { speed: 0.6,
  a: pose({ spineZ: 20, headY: -6,
    lArmX: 158, lArmZ: 14, lElbow: 6,
    rArmX: 10, rArmZ: 10, rElbow: 18, lLegZ: 4, rLegZ: 4 }),
  b: pose({ spineZ: -20, headY: 6,
    rArmX: 158, rArmZ: 14, rElbow: 6,
    lArmX: 10, lArmZ: 10, lElbow: 18, lLegZ: 4, rLegZ: 4 }),
};

P.tree = { speed: 0.3,
  a: pose({
    lArmX: 152, lArmZ: 14, lElbow: 26,
    rArmX: 152, rArmZ: 14, rElbow: 26,
    rLegX: 0, rKnee: 2,
    lLegX: 28, lLegZ: 36, lKnee: 88, lFootX: 22, lFootY: 12,
    spineZ: -1 }),
  b: pose({
    lArmX: 158, lArmZ: 15, lElbow: 22,
    rArmX: 158, rArmZ: 15, rElbow: 22,
    rLegX: 0, rKnee: 2,
    lLegX: 30, lLegZ: 36, lKnee: 90, lFootX: 24, lFootY: 12,
    spineZ: 1 }),
};

P["warrior-three"] = { speed: 0.32,
  a: pose({ rootX: 0.55, rootY: -0.9, spineX: 76, spineZ: -2, headX: -10,
    lLegX: 8, lKnee: 14, lFootX: 10,
    rLegX: -82, rKnee: 8, rLegZ: 4, rFootX: 10,
    lArmX: 104, lArmZ: 18, lElbow: 12,
    rArmX: 104, rArmZ: 18, rElbow: 12 }),
  b: pose({ rootX: 0.55, rootY: -0.96, spineX: 80, spineZ: 2, headX: -12,
    lLegX: 10, lKnee: 16, lFootX: 10,
    rLegX: -86, rKnee: 8, rLegZ: 5, rFootX: 12,
    lArmX: 112, lArmZ: 18, lElbow: 10,
    rArmX: 112, rArmZ: 18, rElbow: 10 }),
};

P.fold = { speed: 0.4,
  a: pose({ spineX: 75, headX: 10,
    lArmX: -15, lArmZ: 8, lElbow: 18,
    rArmX: -15, rArmZ: 8, rElbow: 18,
    lLegX: 5, lKnee: 14, lFootX: 8,
    rLegX: 5, rKnee: 14, rFootX: 8 }),
  b: pose({ spineX: 88, headX: 14,
    lArmX: -10, lArmZ: 6, lElbow: 12,
    rArmX: -10, rArmZ: 6, rElbow: 12,
    lLegX: 5, lKnee: 18, lFootX: 12,
    rLegX: 5, rKnee: 18, rFootX: 12 }),
};

P["wide-fold"] = { speed: 0.36,
  a: pose({ rootY: -0.55, spineX: 74, headX: 12,
    lArmX: -12, lArmZ: 12, lElbow: 22,
    rArmX: -12, rArmZ: 12, rElbow: 22,
    lLegX: 4, lKnee: 12, lLegZ: 18, lFootX: 8, lFootY: 12,
    rLegX: 4, rKnee: 12, rLegZ: 18, rFootX: 8, rFootY: 12 }),
  b: pose({ rootY: -0.7, spineX: 86, headX: 16,
    lArmX: -8, lArmZ: 10, lElbow: 16,
    rArmX: -8, rArmZ: 10, rElbow: 16,
    lLegX: 4, lKnee: 16, lLegZ: 20, lFootX: 10, lFootY: 12,
    rLegX: 4, rKnee: 16, rLegZ: 20, rFootX: 10, rFootY: 12 }),
};

P.seated = { speed: 0.3,
  a: lotusSeat({ spineX: 2,
    lArmX: 28, lElbow: 18, lArmZ: 8,
    rArmX: 28, rElbow: 18, rArmZ: 8 }),
  b: lotusSeat({ rootY: -5.48, spineX: 0,
    lArmX: 28, lElbow: 18, lArmZ: 8,
    rArmX: 28, rElbow: 18, rArmZ: 8 }),
};

P.goddess = { speed: 0.34,
  a: pose({ rootY: -1.35, spineX: 1,
    lLegX: 42, lKnee: 68, lLegZ: 20, lFootY: 24,
    rLegX: 42, rKnee: 68, rLegZ: 20, rFootY: 24,
    lArmX: 18, lArmZ: 74, lElbow: 88,
    rArmX: 18, rArmZ: 74, rElbow: 88 }),
  b: pose({ rootY: -1.55, spineX: 0,
    lLegX: 48, lKnee: 76, lLegZ: 22, lFootY: 26,
    rLegX: 48, rKnee: 76, rLegZ: 22, rFootY: 26,
    lArmX: 20, lArmZ: 78, lElbow: 92,
    rArmX: 20, rArmZ: 78, rElbow: 92 }),
};

P["triangle-right"] = { speed: 0.34,
  a: pose({ rootY: -0.55, spineX: 8, spineY: 12, spineZ: -34, headY: 12,
    rLegX: 10, rKnee: 8, rLegZ: 10, rFootY: 4,
    lLegX: -2, lKnee: 6, lLegZ: 18, lFootY: 18,
    rArmX: 8, rArmZ: 78, rElbow: 8,
    lArmX: 0, lArmZ: 80, lElbow: 8 }),
  b: pose({ rootY: -0.62, spineX: 10, spineY: 14, spineZ: -38, headY: 10,
    rLegX: 10, rKnee: 10, rLegZ: 10, rFootY: 4,
    lLegX: -2, lKnee: 6, lLegZ: 18, lFootY: 18,
    rArmX: 10, rArmZ: 80, rElbow: 6,
    lArmX: 0, lArmZ: 84, lElbow: 6 }),
};

P["pyramid-left"] = { speed: 0.32,
  a: pose({ rootX: -0.18, rootY: -0.45, spineX: 58, spineY: -8, headX: 8,
    lLegX: 10, lKnee: 12, lFootX: 8,
    rLegX: -8, rKnee: 8, rLegZ: 8, rFootY: 12,
    lArmX: -8, lArmZ: 8, lElbow: 20,
    rArmX: -8, rArmZ: 8, rElbow: 20 }),
  b: pose({ rootX: -0.18, rootY: -0.52, spineX: 68, spineY: -10, headX: 10,
    lLegX: 12, lKnee: 16, lFootX: 10,
    rLegX: -10, rKnee: 10, rLegZ: 8, rFootY: 12,
    lArmX: -10, lArmZ: 8, lElbow: 16,
    rArmX: -10, rArmZ: 8, rElbow: 16 }),
};

P["pyramid-right"] = { speed: 0.32,
  a: pose({ rootX: 0.18, rootY: -0.45, spineX: 58, spineY: 8, headX: 8,
    rLegX: 10, rKnee: 12, rFootX: 8,
    lLegX: -8, lKnee: 8, lLegZ: 8, lFootY: 12,
    rArmX: -8, rArmZ: 8, rElbow: 20,
    lArmX: -8, lArmZ: 8, lElbow: 20 }),
  b: pose({ rootX: 0.18, rootY: -0.52, spineX: 68, spineY: 10, headX: 10,
    rLegX: 12, rKnee: 16, rFootX: 10,
    lLegX: -10, lKnee: 10, lLegZ: 8, lFootY: 12,
    rArmX: -10, rArmZ: 8, rElbow: 16,
    lArmX: -10, lArmZ: 8, lElbow: 16 }),
};

P["low-lunge-right"] = { speed: 0.38,
  a: pose({ rootY: -1.95, spineX: -2, spineZ: 1, headX: -1, headY: -6,
    rLegX: 72, rKnee: 84, rLegZ: 3, rFootX: 10,
    lLegX: -28, lKnee: 18, lLegZ: 6, lFootX: 22,
    lArmX: 142, lArmZ: 18, lElbow: 16,
    rArmX: 142, rArmZ: 18, rElbow: 16 }),
  b: pose({ rootY: -2.1, spineX: -4, spineZ: -1, headX: -3, headY: -8,
    rLegX: 76, rKnee: 88, rLegZ: 3, rFootX: 12,
    lLegX: -32, lKnee: 20, lLegZ: 6, lFootX: 24,
    lArmX: 154, lArmZ: 18, lElbow: 12,
    rArmX: 154, rArmZ: 18, rElbow: 12 }),
};

P["skandasana-left"] = { speed: 0.3,
  a: pose({ rootX: -0.82, rootY: -2.0, spineX: 22, spineY: -8, spineZ: -4,
    lLegX: 74, lKnee: 104, lLegZ: 16, lFootX: 18, lFootY: 18,
    rLegX: 4, rKnee: 8, rLegZ: 34, rFootX: 18, rFootY: 20,
    lArmX: 34, lArmZ: 16, lElbow: 36,
    rArmX: 32, rArmZ: 16, rElbow: 36 }),
  b: pose({ rootX: -0.9, rootY: -2.15, spineX: 26, spineY: -10, spineZ: -2,
    lLegX: 80, lKnee: 112, lLegZ: 17, lFootX: 20, lFootY: 18,
    rLegX: 4, rKnee: 10, rLegZ: 36, rFootX: 20, rFootY: 20,
    lArmX: 38, lArmZ: 16, lElbow: 38,
    rArmX: 36, rArmZ: 16, rElbow: 38 }),
};

P["skandasana-right"] = { speed: 0.3,
  a: pose({ rootX: 0.82, rootY: -2.0, spineX: 22, spineY: 8, spineZ: 4,
    rLegX: 74, rKnee: 104, rLegZ: 16, rFootX: 18, rFootY: 18,
    lLegX: 4, lKnee: 8, lLegZ: 34, lFootX: 18, lFootY: 20,
    rArmX: 34, rArmZ: 16, rElbow: 36,
    lArmX: 32, lArmZ: 16, lElbow: 36 }),
  b: pose({ rootX: 0.9, rootY: -2.15, spineX: 26, spineY: 10, spineZ: 2,
    rLegX: 80, rKnee: 112, rLegZ: 17, rFootX: 20, rFootY: 18,
    lLegX: 4, lKnee: 10, lLegZ: 36, lFootX: 20, lFootY: 20,
    rArmX: 38, rArmZ: 16, rElbow: 38,
    lArmX: 36, lArmZ: 16, lElbow: 38 }),
};

P["belly-breath"] = { speed: 0.24,
  a: lotusSeat({ spineX: 1,
    lArmX: 42, lElbow: 74, lArmZ: 10,
    rArmX: 42, rElbow: 74, rArmZ: 10 }),
  b: lotusSeat({ rootY: -5.42, spineX: -1,
    lArmX: 46, lElbow: 70, lArmZ: 12,
    rArmX: 46, rElbow: 70, rArmZ: 12 }),
};

P["box-breath"] = { speed: 0.2,
  a: lotusSeat({ spineX: 1,
    lArmX: 56, lArmZ: 12, lElbow: 92,
    rArmX: 56, rArmZ: 12, rElbow: 92 }),
  b: lotusSeat({ rootY: -5.46, spineX: 0,
    lArmX: 64, lArmZ: 14, lElbow: 86,
    rArmX: 64, rArmZ: 14, rElbow: 86 }),
};

P["long-exhale"] = { speed: 0.18,
  a: lotusSeat({ spineX: -1,
    lArmX: 30, lArmZ: 8, lElbow: 28,
    rArmX: 30, rArmZ: 8, rElbow: 28 }),
  b: lotusSeat({ rootY: -5.5, spineX: 3, headX: 1,
    lArmX: 24, lArmZ: 7, lElbow: 24,
    rArmX: 24, rArmZ: 7, rElbow: 24 }),
};

P["sukhasana-breath"] = { speed: 0.22,
  a: lotusSeat({ spineX: 1,
    lArmX: 30, lArmZ: 8, lElbow: 22,
    rArmX: 30, rArmZ: 8, rElbow: 22 }),
  b: lotusSeat({ rootY: -5.42, spineX: -1,
    lArmX: 34, lArmZ: 10, lElbow: 24,
    rArmX: 34, rArmZ: 10, rElbow: 24 }),
};

P["child-pose"] = { speed: 0.18,
  a: pose({ rootY: -5.9, spineX: 70, headX: 20,
    lLegX: 92, lKnee: 128, lLegZ: 16, lFootX: 18,
    rLegX: 92, rKnee: 128, rLegZ: 16, rFootX: 18,
    lArmX: 118, lArmZ: 12, lElbow: 18,
    rArmX: 118, rArmZ: 12, rElbow: 18 }),
  b: pose({ rootY: -6.02, spineX: 76, headX: 24,
    lLegX: 94, lKnee: 132, lLegZ: 18, lFootX: 20,
    rLegX: 94, rKnee: 132, rLegZ: 18, rFootX: 20,
    lArmX: 126, lArmZ: 10, lElbow: 16,
    rArmX: 126, rArmZ: 10, rElbow: 16 }),
};

P.vajrasana = { speed: 0.2,
  a: pose({ rootY: -5.65, spineX: 1,
    lLegX: 82, lKnee: 136, lLegZ: 5, lFootX: 24,
    rLegX: 82, rKnee: 136, rLegZ: 5, rFootX: 24,
    lArmX: 32, lArmZ: 9, lElbow: 24,
    rArmX: 32, rArmZ: 9, rElbow: 24 }),
  b: pose({ rootY: -5.58, spineX: -1,
    lLegX: 82, lKnee: 136, lLegZ: 5, lFootX: 24,
    rLegX: 82, rKnee: 136, rLegZ: 5, rFootX: 24,
    lArmX: 34, lArmZ: 10, lElbow: 26,
    rArmX: 34, rArmZ: 10, rElbow: 26 }),
};

P.butterfly = { speed: 0.24,
  a: pose({ rootY: -6.35, spineX: 2,
    lLegX: 54, lLegZ: 52, lKnee: 112, lFootX: 20, lFootY: 18,
    rLegX: 54, rLegZ: 52, rKnee: 112, rFootX: 20, rFootY: 18,
    lArmX: 36, lArmZ: 12, lElbow: 46,
    rArmX: 36, rArmZ: 12, rElbow: 46 }),
  b: pose({ rootY: -6.42, spineX: 4,
    lLegX: 55, lLegZ: 56, lKnee: 116, lFootX: 22, lFootY: 20,
    rLegX: 55, rLegZ: 56, rKnee: 116, rFootX: 22, rFootY: 20,
    lArmX: 38, lArmZ: 12, lElbow: 50,
    rArmX: 38, rArmZ: 12, rElbow: 50 }),
};

P["supported-forward-fold"] = { speed: 0.18,
  a: pose({ rootY: -6.35, spineX: 50, headX: 12,
    lLegX: 38, lLegZ: 10, lKnee: 16, lFootX: 12,
    rLegX: 38, rLegZ: 10, rKnee: 16, rFootX: 12,
    lArmX: 72, lArmZ: 8, lElbow: 34,
    rArmX: 72, rArmZ: 8, rElbow: 34 }),
  b: pose({ rootY: -6.42, spineX: 58, headX: 16,
    lLegX: 40, lLegZ: 10, lKnee: 18, lFootX: 14,
    rLegX: 40, rLegZ: 10, rKnee: 18, rFootX: 14,
    lArmX: 78, lArmZ: 8, lElbow: 38,
    rArmX: 78, rArmZ: 8, rElbow: 38 }),
};

P["legs-up-wall"] = { speed: 0.18,
  a: pose({ rootY: -5.7, rootRotX: 78, spineX: -4, headX: 6,
    lLegX: 72, lKnee: 6, lLegZ: 4, lFootX: 8,
    rLegX: 72, rKnee: 6, rLegZ: 4, rFootX: 8,
    lArmX: -8, lArmZ: 38, lElbow: 12,
    rArmX: -8, rArmZ: 38, rElbow: 12 }),
  b: pose({ rootY: -5.62, rootRotX: 78, spineX: -3, headX: 5,
    lLegX: 76, lKnee: 6, lLegZ: 5, lFootX: 10,
    rLegX: 76, rKnee: 6, rLegZ: 5, rFootX: 10,
    lArmX: -8, lArmZ: 40, lElbow: 12,
    rArmX: -8, rArmZ: 40, rElbow: 12 }),
};

P["supported-bridge"] = { speed: 0.2,
  a: pose({ rootY: -4.6, rootRotX: 72, spineX: -10, headX: 6,
    lLegX: 58, lKnee: 80, lLegZ: 3, lFootX: 8,
    rLegX: 58, rKnee: 80, rLegZ: 3, rFootX: 8,
    lArmX: -12, lArmZ: 18, lElbow: 10,
    rArmX: -12, rArmZ: 18, rElbow: 10 }),
  b: pose({ rootY: -4.45, rootRotX: 72, spineX: -14, headX: 6,
    lLegX: 58, lKnee: 82, lLegZ: 3, lFootX: 8,
    rLegX: 58, rKnee: 82, rLegZ: 3, rFootX: 8,
    lArmX: -14, lArmZ: 18, lElbow: 10,
    rArmX: -14, rArmZ: 18, rElbow: 10 }),
};

P.shavasana = { speed: 0.16,
  a: pose({ rootY: -5.45, rootRotX: 88, spineX: 0, headX: 4,
    lLegX: 6, lKnee: 4, lLegZ: 10, lFootX: 4,
    rLegX: 6, rKnee: 4, rLegZ: 10, rFootX: 4,
    lArmX: -8, lArmZ: 32, lElbow: 6,
    rArmX: -8, rArmZ: 32, rElbow: 6 }),
  b: pose({ rootY: -5.38, rootRotX: 88, spineX: 1, headX: 4,
    lLegX: 6, lKnee: 4, lLegZ: 12, lFootX: 4,
    rLegX: 6, rKnee: 4, rLegZ: 12, rFootX: 4,
    lArmX: -8, lArmZ: 34, lElbow: 6,
    rArmX: -8, rArmZ: 34, rElbow: 6 }),
};

P.rest = { speed: 0.3,
  a: pose({}),
  b: pose({ rootY: 0.08, lArmZ: 12, rArmZ: 12 }),
};

// ── Dance ──

P["dance-bounce"] = { speed: 1.4,
  a: pose({ rootX: -0.4, rootY: -0.45, spineZ: -4, headY: -6,
    lLegX: 10, lKnee: 26, lLegZ: 9,
    rLegX: -6, rKnee: 30, rFootX: 10,
    lArmX: 26, lArmZ: 18, lElbow: 72,
    rArmX: -6, rArmZ: 12, rElbow: 28 }),
  b: pose({ rootX: 0.4, rootY: -0.45, spineZ: 4, headY: 6,
    rLegX: 10, rKnee: 26, rLegZ: 9,
    lLegX: -6, lKnee: 30, lFootX: 10,
    rArmX: 26, rArmZ: 18, rElbow: 72,
    lArmX: -6, lArmZ: 12, lElbow: 28 }),
};

P["step-touch"] = { speed: 1.2,
  a: pose({ rootX: -1.0, rootY: -0.2, spineZ: -6, headY: -8,
    lLegZ: 12, lKnee: 18,
    rLegZ: -4, rKnee: 10,
    lArmX: 36, lArmZ: 16, lElbow: 44,
    rArmX: 12, rArmZ: 58, rElbow: 22 }),
  b: pose({ rootX: 1.0, rootY: -0.2, spineZ: 6, headY: 8,
    rLegZ: 12, rKnee: 18,
    lLegZ: -4, lKnee: 10,
    rArmX: 36, rArmZ: 16, rElbow: 44,
    lArmX: 12, lArmZ: 58, lElbow: 22 }),
};

P.grapevine = { speed: 1.1,
  a: pose({ rootX: -0.75, rootY: -0.32, spineY: -10, spineZ: -4, headY: -10,
    lLegZ: 8, lKnee: 18,
    rLegZ: -10, rLegX: -4, rKnee: 24,
    lArmX: 20, lArmZ: 28, lElbow: 68,
    rArmX: -8, rArmZ: 16, rElbow: 30 }),
  b: pose({ rootX: 0.75, rootY: -0.32, spineY: 10, spineZ: 4, headY: 10,
    rLegZ: 8, rKnee: 18,
    lLegZ: -10, lLegX: -4, lKnee: 24,
    rArmX: 20, rArmZ: 28, rElbow: 68,
    lArmX: -8, lArmZ: 16, lElbow: 30 }),
};

P["cross-groove"] = { speed: 1.25,
  a: pose({ rootX: -0.35, rootY: -0.28, spineY: -18, headY: -10,
    lLegX: 8, lKnee: 24,
    rLegX: -4, rKnee: 18,
    lArmX: 42, lArmZ: 8, lElbow: 18,
    rArmX: 24, rArmZ: 44, rElbow: 56 }),
  b: pose({ rootX: 0.35, rootY: -0.28, spineY: 18, headY: 10,
    rLegX: 8, rKnee: 24,
    lLegX: -4, lKnee: 18,
    rArmX: 42, rArmZ: 8, rElbow: 18,
    lArmX: 24, lArmZ: 44, lElbow: 56 }),
};

P.disco = { speed: 1.18,
  a: pose({ rootX: -0.5, rootY: -0.15, spineZ: -4, headY: -10,
    lLegZ: 10, lKnee: 12,
    rLegX: -4, rKnee: 16,
    lArmX: 165, lArmZ: 18, lElbow: 10,
    rArmX: 20, rArmZ: 26, rElbow: 68 }),
  b: pose({ rootX: 0.5, rootY: -0.15, spineZ: 4, headY: 10,
    rLegZ: 10, rKnee: 12,
    lLegX: -4, lKnee: 16,
    rArmX: 165, rArmZ: 18, rElbow: 10,
    lArmX: 20, lArmZ: 26, lElbow: 68 }),
};

P.skater = { speed: 1.35,
  a: pose({ rootX: -1.15, rootY: -0.65, spineZ: -10, headY: -8,
    lLegX: 12, lKnee: 34, lLegZ: 8,
    rLegX: -20, rKnee: 42, rLegZ: -8, rFootX: 12,
    lArmX: 12, lArmZ: 34, lElbow: 34,
    rArmX: 34, rArmZ: 10, rElbow: 60 }),
  b: pose({ rootX: 1.15, rootY: -0.65, spineZ: 10, headY: 8,
    rLegX: 12, rKnee: 34, rLegZ: 8,
    lLegX: -20, lKnee: 42, lLegZ: -8, lFootX: 12,
    rArmX: 12, rArmZ: 34, rElbow: 34,
    lArmX: 34, lArmZ: 10, lElbow: 60 }),
};

P.freestyle = { speed: 1.08,
  a: pose({ rootX: -0.3, rootY: -0.1, spineY: -10, spineZ: -3, headY: -6,
    lLegX: 34, lKnee: 58, lFootX: 10,
    rLegX: -2, rKnee: 16,
    lArmX: 42, lArmZ: 48, lElbow: 26,
    rArmX: 152, rArmZ: 16, rElbow: 16 }),
  b: pose({ rootX: 0.3, rootY: -0.28, spineY: 8, spineZ: 5, headY: 6,
    rLegX: 6, rKnee: 24, rLegZ: 10,
    lLegX: -4, lKnee: 20,
    rArmX: 28, rArmZ: 18, rElbow: 62,
    lArmX: 28, lArmZ: 60, lElbow: 18 }),
};

// ═══════════════════════════════════════════════════════════
//  THREE.JS 3D HUMANOID AVATAR
// ═══════════════════════════════════════════════════════════

let scene, camera, renderer3d, avatarGroup, morpheusGroup, redPillGroup;
const advancedCue = { active: false, startedAt: 0, duration: 5200 };
let bones = {};
const BODY = {
  headR: 0.82, neckL: 0.45, neckR: 0.28,
  torsoL: 3.0, torsoW: 1.05, torsoD: 0.6,
  shoulderW: 2.0, hipW: 1.2,
  uArmL: 2.3, uArmR: 0.28, lArmL: 2.0, lArmR: 0.22, handR: 0.22,
  uLegL: 3.1, uLegR: 0.4, lLegL: 2.9, lLegR: 0.3,
  footL: 1.1, footH: 0.22, footW: 0.38,
};

const MEDIAPIPE_VERSION = "0.10.22-rc.20250304";
const MEDIAPIPE_MODULE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/+esm`;
const MEDIAPIPE_WASM_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`;
const MEDIAPIPE_POSE_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";
let mediaPipeModule = null;
const POSE_IDX = {
  nose: 0, leftEar: 7, rightEar: 8,
  leftShoulder: 11, rightShoulder: 12,
  leftElbow: 13, rightElbow: 14,
  leftWrist: 15, rightWrist: 16,
  leftHip: 23, rightHip: 24,
  leftKnee: 25, rightKnee: 26,
  leftAnkle: 27, rightAnkle: 28,
  leftHeel: 29, rightHeel: 30,
  leftToe: 31, rightToe: 32,
};

const neuralPose = {
  canvas: null,
  ctx: null,
  statusEl: null,
  visible: false,
  ready: false,
  failed: false,
  loading: false,
  landmarker: null,
  result: null,
  cssWidth: 0,
  cssHeight: 0,
  detectEveryMs: 90,
  lastDetectAt: 0,
  lastSeenAt: 0,
};

function getOverlayPalette() {
  const palettes = {
    exercise: { glow: "rgba(89, 169, 255, 0.34)", bone: "#8bd3ff", joint: "#ffffff", shell: "rgba(37, 99, 235, 0.22)", accent: "#f97316" },
    yoga: { glow: "rgba(61, 217, 196, 0.3)", bone: "#7ef7e4", joint: "#f4fffd", shell: "rgba(5, 150, 105, 0.2)", accent: "#7b8fff" },
    dance: { glow: "rgba(250, 204, 21, 0.3)", bone: "#ffd76a", joint: "#fff8d1", shell: "rgba(249, 115, 22, 0.22)", accent: "#fb7185" },
    breath: { glow: "rgba(139, 211, 255, 0.32)", bone: "#8bd3ff", joint: "#f5fbff", shell: "rgba(8, 145, 178, 0.22)", accent: "#c7f464" },
  };
  return palettes[state?.track] || palettes.exercise;
}

function setPoseOverlayStatus(text, mode = "loading") {
  if (!neuralPose.statusEl) return;
  neuralPose.statusEl.textContent = text;
  neuralPose.statusEl.dataset.state = mode;
}

function ensurePoseOverlay(stageEl) {
  if (!stageEl || neuralPose.canvas) return;
  const canvas = document.createElement("canvas");
  canvas.className = "pose-overlay-canvas";
  stageEl.appendChild(canvas);
  neuralPose.canvas = canvas;
  neuralPose.ctx = canvas.getContext("2d");

  const status = document.createElement("div");
  status.className = "pose-overlay-status";
  status.setAttribute("aria-live", "polite");
  stageEl.appendChild(status);
  neuralPose.statusEl = status;
  setPoseOverlayStatus("AI pose guide loading", "loading");
  setPoseOverlayVisible(state?.neuralPoseEnabled ?? false);
}

function setPoseOverlayVisible(visible) {
  neuralPose.visible = visible;
  if (neuralPose.canvas) {
    neuralPose.canvas.hidden = !visible;
    if (!visible && neuralPose.ctx) {
      neuralPose.ctx.clearRect(0, 0, neuralPose.canvas.width, neuralPose.canvas.height);
    }
  }
  if (neuralPose.statusEl) neuralPose.statusEl.hidden = !visible;
}

function resizePoseOverlay(width, height) {
  if (!neuralPose.canvas || !neuralPose.ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  neuralPose.cssWidth = width;
  neuralPose.cssHeight = height;
  neuralPose.canvas.width = Math.round(width * dpr);
  neuralPose.canvas.height = Math.round(height * dpr);
  neuralPose.canvas.style.width = `${width}px`;
  neuralPose.canvas.style.height = `${height}px`;
  neuralPose.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

async function initNeuralPose() {
  if (neuralPose.ready || neuralPose.loading || neuralPose.failed) return;
  neuralPose.loading = true;
  setPoseOverlayStatus("AI pose guide loading", "loading");
  try {
    mediaPipeModule ||= await import(MEDIAPIPE_MODULE_URL);
    const { FilesetResolver, PoseLandmarker } = mediaPipeModule;
    const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_URL);
    neuralPose.landmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: MEDIAPIPE_POSE_MODEL_URL },
      runningMode: "VIDEO",
      numPoses: 1,
      minPoseDetectionConfidence: 0.35,
      minPosePresenceConfidence: 0.35,
      minTrackingConfidence: 0.35,
    });
    neuralPose.ready = true;
    setPoseOverlayStatus("AI pose guide active", "live");
  } catch (error) {
    neuralPose.failed = true;
    setPoseOverlayStatus("AI pose guide offline", "offline");
    console.warn("Failed to start AI pose guide.", error);
  } finally {
    neuralPose.loading = false;
  }
}

function updateNeuralPose(nowMs) {
  if (state?.track === "breath") return;
  if (cameraCoach.active) return;
  if (!state?.neuralPoseEnabled || !neuralPose.ready || !neuralPose.landmarker || !renderer3d) return;
  if (nowMs - neuralPose.lastDetectAt < neuralPose.detectEveryMs) return;
  neuralPose.lastDetectAt = nowMs;
  try {
    const result = neuralPose.landmarker.detectForVideo(renderer3d.domElement, nowMs);
    if (result?.landmarks?.[0]?.length) {
      neuralPose.result = result;
      neuralPose.lastSeenAt = nowMs;
      setPoseOverlayStatus("AI pose guide active", "live");
    }
  } catch (error) {
    console.warn("AI pose guide detection failed.", error);
    neuralPose.failed = true;
    neuralPose.ready = false;
    setPoseOverlayStatus("AI pose guide offline", "offline");
  }
}

function scorePoint(p) {
  return p ? Math.max(p.visibility ?? 0, p.presence ?? 0, 0.35) : 0;
}

function landmarkPoint(landmarks, index) {
  const p = landmarks?.[index];
  if (!p) return null;
  return { x: p.x * neuralPose.cssWidth, y: p.y * neuralPose.cssHeight, score: scorePoint(p) };
}

function mixPoints(...points) {
  const valid = points.filter(Boolean);
  if (!valid.length) return null;
  const sum = valid.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y, score: acc.score + (p.score ?? 0.6) }), { x: 0, y: 0, score: 0 });
  return { x: sum.x / valid.length, y: sum.y / valid.length, score: sum.score / valid.length };
}

function drawGlowLine(ctx, a, b, width, color, alpha = 1) {
  if (!a || !b) return;
  const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
  grad.addColorStop(0, color.replace(/[\d.]+\)$/u, `${Math.min(alpha, 0.92)})`));
  grad.addColorStop(1, color.replace(/[\d.]+\)$/u, `${Math.max(alpha * 0.4, 0.18)})`));
  ctx.strokeStyle = grad;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawJoint(ctx, p, radius, color) {
  if (!p) return;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawTorsoShell(ctx, leftShoulder, rightShoulder, rightHip, leftHip, fill) {
  if (!leftShoulder || !rightShoulder || !rightHip || !leftHip) return;
  const top = mixPoints(leftShoulder, rightShoulder);
  const bottom = mixPoints(leftHip, rightHip);
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(leftShoulder.x, leftShoulder.y);
  ctx.quadraticCurveTo(top.x, top.y - 24, rightShoulder.x, rightShoulder.y);
  ctx.lineTo(rightHip.x, rightHip.y);
  ctx.quadraticCurveTo(bottom.x, bottom.y + 20, leftHip.x, leftHip.y);
  ctx.closePath();
  ctx.fill();
}

function drawFootDirection(ctx, heel, toe, accent) {
  if (!heel || !toe) return;
  const dx = toe.x - heel.x;
  const dy = toe.y - heel.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const arrowX = toe.x + ux * 10;
  const arrowY = toe.y + uy * 10;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(heel.x, heel.y);
  ctx.lineTo(arrowX, arrowY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - ux * 8 - uy * 5, arrowY - uy * 8 + ux * 5);
  ctx.lineTo(arrowX - ux * 8 + uy * 5, arrowY - uy * 8 - ux * 5);
  ctx.closePath();
  ctx.fillStyle = accent;
  ctx.fill();
}

function projectFromObject(obj, x = 0, y = 0, z = 0) {
  if (!obj || !camera || !neuralPose.cssWidth || typeof THREE === "undefined") return null;
  const v = new THREE.Vector3(x, y, z);
  obj.localToWorld(v);
  v.project(camera);
  if (!Number.isFinite(v.x) || !Number.isFinite(v.y) || v.z > 1.2) return null;
  return {
    x: (v.x * 0.5 + 0.5) * neuralPose.cssWidth,
    y: (-v.y * 0.5 + 0.5) * neuralPose.cssHeight,
    score: 1,
  };
}

function drawProjectedPose() {
  if (!state?.neuralPoseEnabled) return;
  if (!bones.root || !bones.lArm || !bones.rArm) return;
  const ctx = neuralPose.ctx;
  const palette = getOverlayPalette();
  const leftShoulder = projectFromObject(bones.lArm);
  const rightShoulder = projectFromObject(bones.rArm);
  const leftElbow = projectFromObject(bones.lElbow);
  const rightElbow = projectFromObject(bones.rElbow);
  const leftWrist = projectFromObject(bones.lElbow, 0, -BODY.lArmL - 0.15, 0);
  const rightWrist = projectFromObject(bones.rElbow, 0, -BODY.lArmL - 0.15, 0);
  const leftHip = projectFromObject(bones.root, BODY.hipW / 2, 0, 0);
  const rightHip = projectFromObject(bones.root, -BODY.hipW / 2, 0, 0);
  const leftKnee = projectFromObject(bones.lKnee);
  const rightKnee = projectFromObject(bones.rKnee);
  const leftAnkle = projectFromObject(bones.lFoot);
  const rightAnkle = projectFromObject(bones.rFoot);
  const leftHeel = projectFromObject(bones.lFoot, 0, -BODY.footH * 0.2, BODY.footL * 0.18);
  const rightHeel = projectFromObject(bones.rFoot, 0, -BODY.footH * 0.2, BODY.footL * 0.18);
  const leftToe = projectFromObject(bones.lFoot, 0, -BODY.footH * 0.02, -BODY.footL * 0.78);
  const rightToe = projectFromObject(bones.rFoot, 0, -BODY.footH * 0.02, -BODY.footL * 0.78);
  const head = mixPoints(projectFromObject(bones.head, 0, BODY.headR * 0.25, 0), leftShoulder, rightShoulder);

  drawTorsoShell(ctx, leftShoulder, rightShoulder, rightHip, leftHip, palette.shell);
  ctx.save();
  ctx.shadowBlur = 24;
  ctx.shadowColor = palette.glow;
  drawGlowLine(ctx, leftShoulder, rightShoulder, 9, palette.glow, 0.5);
  drawGlowLine(ctx, leftShoulder, leftElbow, 11, palette.glow, 0.78);
  drawGlowLine(ctx, leftElbow, leftWrist, 9, palette.glow, 0.72);
  drawGlowLine(ctx, rightShoulder, rightElbow, 11, palette.glow, 0.78);
  drawGlowLine(ctx, rightElbow, rightWrist, 9, palette.glow, 0.72);
  drawGlowLine(ctx, leftShoulder, leftHip, 13, palette.glow, 0.68);
  drawGlowLine(ctx, rightShoulder, rightHip, 13, palette.glow, 0.68);
  drawGlowLine(ctx, leftHip, rightHip, 11, palette.glow, 0.56);
  drawGlowLine(ctx, leftHip, leftKnee, 13, palette.glow, 0.74);
  drawGlowLine(ctx, leftKnee, leftAnkle, 11, palette.glow, 0.68);
  drawGlowLine(ctx, rightHip, rightKnee, 13, palette.glow, 0.74);
  drawGlowLine(ctx, rightKnee, rightAnkle, 11, palette.glow, 0.68);
  drawGlowLine(ctx, leftAnkle, leftToe, 8, palette.glow, 0.7);
  drawGlowLine(ctx, rightAnkle, rightToe, 8, palette.glow, 0.7);
  ctx.restore();

  if (head) {
    const shoulderSpan = Math.abs((rightShoulder?.x || head.x) - (leftShoulder?.x || head.x));
    const radius = Math.max(16, shoulderSpan * 0.2);
    const headGrad = ctx.createRadialGradient(head.x, head.y - radius * 0.2, radius * 0.12, head.x, head.y, radius * 1.15);
    headGrad.addColorStop(0, palette.joint);
    headGrad.addColorStop(1, palette.glow);
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(head.x, head.y - radius * 0.12, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  [leftShoulder, rightShoulder, leftElbow, rightElbow, leftWrist, rightWrist, leftHip, rightHip, leftKnee, rightKnee, leftAnkle, rightAnkle].forEach(p => drawJoint(ctx, p, 4, palette.joint));
  [leftToe, rightToe].forEach(p => drawJoint(ctx, p, 3.2, palette.accent));
  drawFootDirection(ctx, leftHeel || leftAnkle, leftToe, palette.accent);
  drawFootDirection(ctx, rightHeel || rightAnkle, rightToe, palette.accent);
}

function drawNeuralPose() {
  if (state?.track === "breath") return;
  if (!state?.neuralPoseEnabled || !neuralPose.visible || !neuralPose.ctx) return;
  const ctx = neuralPose.ctx;
  ctx.clearRect(0, 0, neuralPose.cssWidth, neuralPose.cssHeight);

  const landmarks = neuralPose.result?.landmarks?.[0];
  if (!landmarks || performance.now() - neuralPose.lastSeenAt > 1000) {
    setPoseOverlayStatus(neuralPose.ready ? "Projection guide active" : "Pose guide active", "fallback");
    drawProjectedPose();
    return;
  }

  const palette = getOverlayPalette();
  const leftShoulder = landmarkPoint(landmarks, POSE_IDX.leftShoulder);
  const rightShoulder = landmarkPoint(landmarks, POSE_IDX.rightShoulder);
  const leftElbow = landmarkPoint(landmarks, POSE_IDX.leftElbow);
  const rightElbow = landmarkPoint(landmarks, POSE_IDX.rightElbow);
  const leftWrist = landmarkPoint(landmarks, POSE_IDX.leftWrist);
  const rightWrist = landmarkPoint(landmarks, POSE_IDX.rightWrist);
  const leftHip = landmarkPoint(landmarks, POSE_IDX.leftHip);
  const rightHip = landmarkPoint(landmarks, POSE_IDX.rightHip);
  const leftKnee = landmarkPoint(landmarks, POSE_IDX.leftKnee);
  const rightKnee = landmarkPoint(landmarks, POSE_IDX.rightKnee);
  const leftAnkle = landmarkPoint(landmarks, POSE_IDX.leftAnkle);
  const rightAnkle = landmarkPoint(landmarks, POSE_IDX.rightAnkle);
  const leftHeel = landmarkPoint(landmarks, POSE_IDX.leftHeel);
  const rightHeel = landmarkPoint(landmarks, POSE_IDX.rightHeel);
  const leftToe = landmarkPoint(landmarks, POSE_IDX.leftToe);
  const rightToe = landmarkPoint(landmarks, POSE_IDX.rightToe);
  const head = mixPoints(
    landmarkPoint(landmarks, POSE_IDX.nose),
    landmarkPoint(landmarks, POSE_IDX.leftEar),
    landmarkPoint(landmarks, POSE_IDX.rightEar),
    leftShoulder,
    rightShoulder
  );

  drawTorsoShell(ctx, leftShoulder, rightShoulder, rightHip, leftHip, palette.shell);

  ctx.save();
  ctx.shadowBlur = 28;
  ctx.shadowColor = palette.glow;
  drawGlowLine(ctx, leftShoulder, rightShoulder, 10, palette.glow, 0.5);
  drawGlowLine(ctx, leftShoulder, leftElbow, 12, palette.glow, 0.8);
  drawGlowLine(ctx, leftElbow, leftWrist, 10, palette.glow, 0.72);
  drawGlowLine(ctx, rightShoulder, rightElbow, 12, palette.glow, 0.8);
  drawGlowLine(ctx, rightElbow, rightWrist, 10, palette.glow, 0.72);
  drawGlowLine(ctx, leftShoulder, leftHip, 14, palette.glow, 0.7);
  drawGlowLine(ctx, rightShoulder, rightHip, 14, palette.glow, 0.7);
  drawGlowLine(ctx, leftHip, rightHip, 12, palette.glow, 0.6);
  drawGlowLine(ctx, leftHip, leftKnee, 14, palette.glow, 0.76);
  drawGlowLine(ctx, leftKnee, leftAnkle, 12, palette.glow, 0.7);
  drawGlowLine(ctx, rightHip, rightKnee, 14, palette.glow, 0.76);
  drawGlowLine(ctx, rightKnee, rightAnkle, 12, palette.glow, 0.7);
  drawGlowLine(ctx, leftAnkle, leftToe, 8, palette.glow, 0.74);
  drawGlowLine(ctx, rightAnkle, rightToe, 8, palette.glow, 0.74);
  ctx.restore();

  if (head) {
    const shoulderSpan = Math.abs((rightShoulder?.x || head.x) - (leftShoulder?.x || head.x));
    const radius = Math.max(18, shoulderSpan * 0.22);
    const headGrad = ctx.createRadialGradient(head.x, head.y - radius * 0.25, radius * 0.1, head.x, head.y, radius * 1.2);
    headGrad.addColorStop(0, palette.joint);
    headGrad.addColorStop(1, palette.glow);
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(head.x, head.y - radius * 0.12, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  [leftShoulder, rightShoulder, leftElbow, rightElbow, leftWrist, rightWrist, leftHip, rightHip, leftKnee, rightKnee, leftAnkle, rightAnkle].forEach(p => drawJoint(ctx, p, 4.5, palette.joint));
  [leftToe, rightToe].forEach(p => drawJoint(ctx, p, 3.5, palette.accent));
  drawFootDirection(ctx, leftHeel || leftAnkle, leftToe, palette.accent);
  drawFootDirection(ctx, rightHeel || rightAnkle, rightToe, palette.accent);
}

// ═══════════════════════════════════════════════════════════
//  CAMERA COACH — local video pose matching
// ═══════════════════════════════════════════════════════════

const CAMERA_SEGMENTS = [
  ["leftShoulder", "rightShoulder"], ["leftShoulder", "leftElbow"], ["leftElbow", "leftWrist"],
  ["rightShoulder", "rightElbow"], ["rightElbow", "rightWrist"], ["leftShoulder", "leftHip"],
  ["rightShoulder", "rightHip"], ["leftHip", "rightHip"], ["leftHip", "leftKnee"],
  ["leftKnee", "leftAnkle"], ["rightHip", "rightKnee"], ["rightKnee", "rightAnkle"],
];
const CAMERA_KEY_JOINTS = ["nose", "leftShoulder", "rightShoulder", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"];
const CAMERA_ANGLE_METRICS = [
  { label: "left elbow", points: ["leftShoulder", "leftElbow", "leftWrist"] },
  { label: "right elbow", points: ["rightShoulder", "rightElbow", "rightWrist"] },
  { label: "left shoulder", points: ["leftElbow", "leftShoulder", "leftHip"] },
  { label: "right shoulder", points: ["rightElbow", "rightShoulder", "rightHip"] },
  { label: "left hip", points: ["leftShoulder", "leftHip", "leftKnee"] },
  { label: "right hip", points: ["rightShoulder", "rightHip", "rightKnee"] },
  { label: "left knee", points: ["leftHip", "leftKnee", "leftAnkle"] },
  { label: "right knee", points: ["rightHip", "rightKnee", "rightAnkle"] },
];

const cameraCoach = {
  active: false,
  stream: null,
  lastDetectAt: 0,
  detectEveryMs: 90,
  lastFrameAt: 0,
  smoothedScore: 0,
  bestScore: 0,
  scoreTotal: 0,
  sampleCount: 0,
  reps: 0,
  holdMs: 0,
  repArmed: true,
  lastCue: "",
  lastCueAt: 0,
  startedAt: 0,
};

function cameraPoint(landmarks, name) {
  const point = landmarks?.[POSE_IDX[name]];
  if (!point) return null;
  return { x: point.x, y: point.y, score: scorePoint(point) };
}

function avatarReferencePoints() {
  if (!neuralPose.cssWidth || !neuralPose.cssHeight) return null;
  const projected = {
    leftShoulder: projectFromObject(bones.lArm),
    rightShoulder: projectFromObject(bones.rArm),
    leftElbow: projectFromObject(bones.lElbow),
    rightElbow: projectFromObject(bones.rElbow),
    leftWrist: projectFromObject(bones.lElbow, 0, -BODY.lArmL - 0.15, 0),
    rightWrist: projectFromObject(bones.rElbow, 0, -BODY.lArmL - 0.15, 0),
    leftHip: projectFromObject(bones.root, BODY.hipW / 2, 0, 0),
    rightHip: projectFromObject(bones.root, -BODY.hipW / 2, 0, 0),
    leftKnee: projectFromObject(bones.lKnee),
    rightKnee: projectFromObject(bones.rKnee),
    leftAnkle: projectFromObject(bones.lFoot),
    rightAnkle: projectFromObject(bones.rFoot),
  };
  return Object.fromEntries(Object.entries(projected).map(([name, point]) => [name, point ? {
    x: point.x / neuralPose.cssWidth,
    y: point.y / neuralPose.cssHeight,
    score: 1,
  } : null]));
}

function jointAngle(a, b, c) {
  if (!a || !b || !c) return null;
  const abx = a.x - b.x, aby = a.y - b.y;
  const cbx = c.x - b.x, cby = c.y - b.y;
  const denom = Math.hypot(abx, aby) * Math.hypot(cbx, cby);
  if (!denom) return null;
  return Math.acos(Math.max(-1, Math.min(1, (abx * cbx + aby * cby) / denom))) / DEG;
}

function scorePoseMatch(landmarks) {
  const user = {};
  Object.keys(POSE_IDX).forEach(name => { user[name] = cameraPoint(landmarks, name); });
  const reference = avatarReferencePoints();
  if (!reference) return null;

  const comparisons = CAMERA_ANGLE_METRICS.map(metric => {
    const [a, b, c] = metric.points;
    if ((user[a]?.score || 0) < 0.35 || (user[b]?.score || 0) < 0.35 || (user[c]?.score || 0) < 0.35) return null;
    const userAngle = jointAngle(user[a], user[b], user[c]);
    const targetAngle = jointAngle(reference[a], reference[b], reference[c]);
    if (!Number.isFinite(userAngle) || !Number.isFinite(targetAngle)) return null;
    const difference = Math.abs(userAngle - targetAngle);
    return { ...metric, difference, score: Math.max(0, 100 - difference * 1.35) };
  }).filter(Boolean);

  if (comparisons.length < 4) return null;
  const score = comparisons.reduce((sum, item) => sum + item.score, 0) / comparisons.length;
  const weakest = comparisons.reduce((worst, item) => item.score < worst.score ? item : worst, comparisons[0]);
  return { score, weakest, comparisons };
}

function framingResult(landmarks) {
  const points = CAMERA_KEY_JOINTS.map(name => cameraPoint(landmarks, name)).filter(Boolean);
  const visible = points.filter(point => point.score >= 0.5);
  const visibility = Math.round((visible.length / CAMERA_KEY_JOINTS.length) * 100);
  const noseVisible = (cameraPoint(landmarks, "nose")?.score || 0) >= 0.5;
  const anklesVisible = ["leftAnkle", "rightAnkle"].every(name => (cameraPoint(landmarks, name)?.score || 0) >= 0.45);
  if (visible.length < 5) return { ready: false, visibility, title: "Step into the camera view", detail: "Face the camera and make sure the room is well lit." };

  const minX = Math.min(...visible.map(p => p.x));
  const maxX = Math.max(...visible.map(p => p.x));
  const minY = Math.min(...visible.map(p => p.y));
  const maxY = Math.max(...visible.map(p => p.y));
  const height = maxY - minY;
  const centerX = (minX + maxX) / 2;
  if (!noseVisible || !anklesVisible || height > 0.94) return { ready: false, visibility, title: "Move farther from the camera", detail: "Keep your head, hands, knees, and feet inside the frame." };
  if (height < 0.48) return { ready: false, visibility, title: "Move a little closer", detail: "Come closer while keeping your whole body visible." };
  if (centerX < 0.34 || centerX > 0.66) return { ready: false, visibility, title: "Reposition toward the center", detail: "Center your hips inside the body outline." };
  return { ready: true, visibility, title: "Full body visible", detail: "Copy the AI pose and follow the live adjustment cue." };
}

function drawCameraSkeleton(landmarks, matchScore = 0) {
  const canvas = el.userPoseCanvas;
  const video = el.cameraVideo;
  if (!canvas || !video.videoWidth) return;
  if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const color = matchScore >= 80 ? "#3dd9c4" : matchScore >= 60 ? "#fbbf24" : "#fb7185";
  ctx.lineWidth = Math.max(4, canvas.width / 180);
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.shadowBlur = 14;
  ctx.shadowColor = color;
  CAMERA_SEGMENTS.forEach(([from, to]) => {
    const a = cameraPoint(landmarks, from), b = cameraPoint(landmarks, to);
    if (!a || !b || a.score < 0.35 || b.score < 0.35) return;
    ctx.beginPath();
    ctx.moveTo(a.x * canvas.width, a.y * canvas.height);
    ctx.lineTo(b.x * canvas.width, b.y * canvas.height);
    ctx.stroke();
  });
  ctx.shadowBlur = 0;
  Object.keys(POSE_IDX).filter(name => name !== "nose" && cameraPoint(landmarks, name)?.score >= 0.45).forEach(name => {
    const point = cameraPoint(landmarks, name);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(point.x * canvas.width, point.y * canvas.height, Math.max(4, canvas.width / 220), 0, Math.PI * 2);
    ctx.fill();
  });
}

function setCameraGuidance(framing, match) {
  const ready = framing.ready && match;
  el.framingGuidance.dataset.state = ready ? "ready" : "adjust";
  el.framingTitle.textContent = framing.title;
  el.framingDetail.textContent = framing.detail;
  if (!ready) {
    el.coachDirectionTitle.textContent = framing.title;
    el.coachDirectionCopy.textContent = framing.detail;
    announceCameraCue(framing.title);
    return;
  }

  if (match.score >= 85) {
    el.coachDirectionTitle.textContent = "Strong match";
    el.coachDirectionCopy.textContent = "Hold this alignment and keep breathing naturally.";
  } else {
    el.coachDirectionTitle.textContent = `Adjust your ${match.weakest.label}`;
    el.coachDirectionCopy.textContent = `Bring the ${match.weakest.label} closer to the AI guide. Make a small change, then settle.`;
  }
}

function announceCameraCue(cue) {
  const now = performance.now();
  if (cue === cameraCoach.lastCue && now - cameraCoach.lastCueAt < 7000) return;
  cameraCoach.lastCue = cue;
  cameraCoach.lastCueAt = now;
  speak(cue);
}

function renderCameraStats(visibility, match) {
  const score = match ? Math.round(cameraCoach.smoothedScore) : 0;
  el.matchScore.textContent = match ? `${score}%` : "--";
  el.matchMeterFill.style.width = `${score}%`;
  el.visibilityScore.textContent = `${visibility}%`;
  el.repCount.textContent = String(cameraCoach.reps);
  el.holdTime.textContent = `${Math.floor(cameraCoach.holdMs / 1000)}s`;
  el.bestScore.textContent = `${Math.round(cameraCoach.bestScore)}%`;
  el.matchLabel.textContent = !match ? "Waiting for a full-body pose" : score >= 85 ? "Excellent alignment" : score >= 70 ? "Close match" : "Keep adjusting";
}

function updateMovementStats(score, nowMs) {
  const delta = cameraCoach.lastFrameAt ? Math.min(250, nowMs - cameraCoach.lastFrameAt) : 0;
  cameraCoach.lastFrameAt = nowMs;
  cameraCoach.smoothedScore = cameraCoach.sampleCount ? cameraCoach.smoothedScore * 0.78 + score * 0.22 : score;
  cameraCoach.bestScore = Math.max(cameraCoach.bestScore, score);
  cameraCoach.scoreTotal += score;
  cameraCoach.sampleCount++;
  if (score >= 78) cameraCoach.holdMs += delta;

  const isDynamic = DYNAMIC_ANIMS.has(step()?.animation);
  if (isDynamic && score < 62) cameraCoach.repArmed = true;
  if (isDynamic && score >= 80 && cameraCoach.repArmed) {
    cameraCoach.reps++;
    cameraCoach.repArmed = false;
  }
}

function updateCameraCoach(nowMs) {
  if (!cameraCoach.active || !neuralPose.ready || !el.cameraVideo || el.cameraVideo.readyState < 2) return;
  if (nowMs - cameraCoach.lastDetectAt < cameraCoach.detectEveryMs) return;
  cameraCoach.lastDetectAt = nowMs;
  try {
    const result = neuralPose.landmarker.detectForVideo(el.cameraVideo, nowMs);
    const landmarks = result?.landmarks?.[0];
    if (!landmarks) {
      renderCameraStats(0, null);
      setCameraGuidance({ ready: false, title: "Step into the camera view", detail: "Face the camera so the coach can find your full body." }, null);
      return;
    }
    const framing = framingResult(landmarks);
    const match = framing.ready ? scorePoseMatch(landmarks) : null;
    if (match) updateMovementStats(match.score, nowMs);
    drawCameraSkeleton(landmarks, match?.score || 0);
    setCameraGuidance(framing, match);
    renderCameraStats(framing.visibility, match);
  } catch (error) {
    console.warn("Camera coach detection failed.", error);
  }
}

function mat(color, rough = 0.65) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.05 });
}

function capsule(r, l, m) {
  const g = new THREE.CapsuleGeometry(r, l, 8, 16);
  return new THREE.Mesh(g, m);
}

function buildAvatar() {
  const skinM = mat(0xd4a583);
  const skinDarkM = mat(0xc29070);
  const shirtM = mat(0x2563eb);
  const shortsM = mat(0x1e293b);
  const shoeM = mat(0xf1f5f9, 0.4);
  const hairM = mat(0x292524, 0.9);

  avatarGroup = new THREE.Group();

  // Root (hips)
  const root = new THREE.Group();
  root.position.y = BODY.uLegL + BODY.lLegL + BODY.footH + 0.6;
  avatarGroup.add(root);
  bones.root = root;

  // Spine (from hips upward)
  const spine = new THREE.Group();
  root.add(spine);
  bones.spine = spine;

  // Torso visual
  const torso = capsule(BODY.torsoW, BODY.torsoL, shirtM);
  torso.position.y = BODY.torsoL / 2 + 0.3;
  spine.add(torso);

  // Hip visual
  const hipMesh = capsule(0.7, BODY.hipW * 0.5, shortsM);
  hipMesh.rotation.z = Math.PI / 2;
  hipMesh.position.y = 0.1;
  spine.add(hipMesh);

  // Neck
  const neck = capsule(BODY.neckR, BODY.neckL, skinM);
  neck.position.y = BODY.torsoL + 0.6;
  spine.add(neck);

  // Head group
  const headG = new THREE.Group();
  headG.position.y = BODY.torsoL + BODY.neckL + 1.1;
  spine.add(headG);
  bones.head = headG;

  // Head mesh
  const head = new THREE.Mesh(new THREE.SphereGeometry(BODY.headR, 24, 18), skinM);
  headG.add(head);

  // Hair
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(BODY.headR * 1.06, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.55),
    hairM
  );
  hair.position.y = 0.08;
  headG.add(hair);

  // Eyes
  const eyeG = new THREE.MeshBasicMaterial({ color: 0x1a1a2e });
  [-0.25, 0.25].forEach(x => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), eyeG);
    eye.position.set(x, 0.08, BODY.headR * 0.88);
    headG.add(eye);
  });

  // Smile
  const smileC = new THREE.EllipseCurve(0, -0.15, 0.18, 0.08, 0, Math.PI, false, 0);
  const smileG = new THREE.BufferGeometry().setFromPoints(smileC.getPoints(12));
  const smile = new THREE.Line(smileG, new THREE.LineBasicMaterial({ color: 0x8b5e3c }));
  smile.position.z = BODY.headR * 0.9;
  headG.add(smile);

  // ── Arms ──
  function buildArm(side) {
    const sign = side === "left" ? 1 : -1;
    const armG = new THREE.Group();
    armG.position.set(sign * BODY.shoulderW / 2, BODY.torsoL + 0.15, 0);
    spine.add(armG);

    const uArm = capsule(BODY.uArmR, BODY.uArmL, skinM);
    uArm.position.y = -BODY.uArmL / 2 - 0.15;
    armG.add(uArm);

    // Shoulder cap (shirt)
    const shoulderCap = capsule(BODY.uArmR + 0.06, 0.4, shirtM);
    shoulderCap.position.y = -0.2;
    armG.add(shoulderCap);

    const elbowG = new THREE.Group();
    elbowG.position.y = -BODY.uArmL - 0.15;
    armG.add(elbowG);

    // Elbow joint visual
    const elbowBall = new THREE.Mesh(new THREE.SphereGeometry(BODY.uArmR + 0.02, 12, 8), skinDarkM);
    elbowG.add(elbowBall);

    const lArm = capsule(BODY.lArmR, BODY.lArmL, skinDarkM);
    lArm.position.y = -BODY.lArmL / 2 - 0.05;
    elbowG.add(lArm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(BODY.handR, 10, 8), skinM);
    hand.position.y = -BODY.lArmL - 0.15;
    elbowG.add(hand);

    return { armG, elbowG };
  }

  const la = buildArm("left");
  bones.lArm = la.armG; bones.lElbow = la.elbowG;
  const ra = buildArm("right");
  bones.rArm = ra.armG; bones.rElbow = ra.elbowG;

  // ── Legs ──
  function buildLeg(side) {
    const sign = side === "left" ? 1 : -1;
    const legG = new THREE.Group();
    legG.position.set(sign * BODY.hipW / 2, 0, 0);
    root.add(legG);

    const uLeg = capsule(BODY.uLegR, BODY.uLegL, shortsM);
    uLeg.position.y = -BODY.uLegL / 2 - 0.1;
    legG.add(uLeg);

    // Skin part of upper leg (below shorts)
    const skinLeg = capsule(BODY.uLegR - 0.02, BODY.uLegL * 0.45, skinM);
    skinLeg.position.y = -BODY.uLegL * 0.65;
    legG.add(skinLeg);

    const kneeG = new THREE.Group();
    kneeG.position.y = -BODY.uLegL - 0.1;
    legG.add(kneeG);

    const kneeBall = new THREE.Mesh(new THREE.SphereGeometry(BODY.uLegR - 0.02, 12, 8), skinDarkM);
    kneeG.add(kneeBall);

    const lLeg = capsule(BODY.lLegR, BODY.lLegL, skinM);
    lLeg.position.y = -BODY.lLegL / 2 - 0.05;
    kneeG.add(lLeg);

    const footG = new THREE.Group();
    footG.position.y = -BODY.lLegL - 0.1;
    kneeG.add(footG);

    const sole = new THREE.Mesh(
      new THREE.BoxGeometry(BODY.footW * 0.96, BODY.footH * 0.55, BODY.footL),
      shoeM
    );
    sole.position.set(0, -BODY.footH * 0.38, -BODY.footL * 0.22);
    footG.add(sole);

    const upper = capsule(BODY.footH * 0.44, BODY.footL * 0.42, shoeM);
    upper.rotation.x = Math.PI / 2;
    upper.scale.set(0.88, 1, 1.22);
    upper.position.set(0, -BODY.footH * 0.05, -BODY.footL * 0.3);
    footG.add(upper);

    const toeCap = new THREE.Mesh(
      new THREE.SphereGeometry(BODY.footW * 0.5, 16, 12),
      shoeM
    );
    toeCap.scale.set(1, 0.72, 1.28);
    toeCap.position.set(0, -BODY.footH * 0.02, -BODY.footL * 0.68);
    footG.add(toeCap);

    const heel = new THREE.Mesh(
      new THREE.BoxGeometry(BODY.footW * 0.82, BODY.footH * 0.72, BODY.footL * 0.24),
      shoeM
    );
    heel.position.set(0, -BODY.footH * 0.2, BODY.footL * 0.18);
    footG.add(heel);

    return { legG, kneeG, footG };
  }

  const ll = buildLeg("left");
  bones.lLeg = ll.legG; bones.lKnee = ll.kneeG;
  bones.lFoot = ll.footG;
  const rl = buildLeg("right");
  bones.rLeg = rl.legG; bones.rKnee = rl.kneeG;
  bones.rFoot = rl.footG;

  scene.add(avatarGroup);
}

function buildMorpheusInstructor() {
  if (morpheusGroup || typeof THREE === "undefined") return;
  const coatM = mat(0x0b0f14, 0.82);
  const shirtM = mat(0x141820, 0.78);
  const skinM = mat(0x9f6f52, 0.66);
  const shadeM = new THREE.MeshBasicMaterial({ color: 0x05070a });
  const redM = new THREE.MeshStandardMaterial({ color: 0xb91c1c, emissive: 0x7f1d1d, roughness: 0.34, metalness: 0.08 });

  morpheusGroup = new THREE.Group();
  morpheusGroup.visible = false;
  morpheusGroup.position.set(-3.05, 0, 0.25);
  morpheusGroup.scale.setScalar(0.72);

  const root = new THREE.Group();
  root.position.y = BODY.uLegL + BODY.lLegL + BODY.footH + 0.45;
  morpheusGroup.add(root);

  const torso = capsule(0.72, 2.65, coatM);
  torso.position.y = BODY.torsoL / 2 + 0.25;
  root.add(torso);

  const shirt = capsule(0.5, 2.05, shirtM);
  shirt.position.set(0, BODY.torsoL / 2 + 0.25, 0.06);
  root.add(shirt);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.62, 22, 16), skinM);
  head.position.y = BODY.torsoL + BODY.neckL + 0.9;
  root.add(head);

  [-0.18, 0.18].forEach(x => {
    const lens = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.09, 0.035), shadeM);
    lens.position.set(x, head.position.y + 0.05, 0.58);
    root.add(lens);
  });
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.035, 0.03), shadeM);
  bridge.position.set(0, head.position.y + 0.05, 0.59);
  root.add(bridge);

  const offerArm = new THREE.Group();
  offerArm.position.set(0.65, BODY.torsoL + 0.08, 0.08);
  offerArm.rotation.set(0.15, 0.2, -Math.PI / 2.35);
  root.add(offerArm);
  const sleeve = capsule(0.15, 1.55, coatM);
  sleeve.position.y = -0.78;
  offerArm.add(sleeve);
  const hand = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), skinM);
  hand.position.y = -1.62;
  offerArm.add(hand);
  morpheusGroup.userData.offerArm = offerArm;

  const leftArm = capsule(0.14, 1.25, coatM);
  leftArm.position.set(-0.82, BODY.torsoL - 0.65, 0);
  leftArm.rotation.z = 0.28;
  root.add(leftArm);

  [-0.28, 0.28].forEach(x => {
    const leg = capsule(0.2, 2.15, coatM);
    leg.position.set(x, -1.1, 0);
    root.add(leg);
  });

  scene.add(morpheusGroup);

  redPillGroup = new THREE.Group();
  redPillGroup.visible = false;
  const pill = capsule(0.075, 0.28, redM);
  pill.rotation.z = Math.PI / 2;
  redPillGroup.add(pill);
  const pillGlow = new THREE.PointLight(0xff2626, 0.8, 1.2);
  redPillGroup.add(pillGlow);
  scene.add(redPillGroup);
}

function updateAdvancedCue(time, nowMs) {
  if (!advancedCue.active) return;
  const elapsed = nowMs - advancedCue.startedAt;
  const t = Math.max(0, Math.min(1, elapsed / advancedCue.duration));

  if (morpheusGroup) {
    const enter = smoothStep(Math.min(1, t / 0.18));
    morpheusGroup.visible = true;
    morpheusGroup.position.x = -3.45 + enter * 0.68;
    morpheusGroup.position.y = Math.sin(time * 2.4) * 0.025;
    morpheusGroup.rotation.y = 0.16 + Math.sin(time * 1.2) * 0.035;
    const offerArm = morpheusGroup.userData.offerArm;
    if (offerArm) offerArm.rotation.z = -Math.PI / 2.35 - Math.sin(Math.min(1, t * 1.8) * Math.PI) * 0.18;
  }

  if (redPillGroup && bones.head) {
    const mouth = new THREE.Vector3(0, -0.12, BODY.headR * 1.08);
    bones.head.localToWorld(mouth);
    const start = mouth.clone().add(new THREE.Vector3(-1.95, 0.42, 0.95));
    const travel = smoothStep(Math.max(0, Math.min(1, (t - 0.16) / 0.52)));
    redPillGroup.visible = t < 0.82;
    redPillGroup.position.lerpVectors(start, mouth, travel);
    redPillGroup.rotation.set(time * 4.6, time * 6.1, Math.PI / 2 + time * 5.2);
    const dissolve = Math.max(0, Math.min(1, (t - 0.68) / 0.14));
    redPillGroup.scale.setScalar(0.55 + (1 - dissolve) * 0.75);
    const nod = Math.sin(Math.max(0, Math.min(1, (t - 0.62) / 0.22)) * Math.PI);
    bones.head.rotation.x += nod * 0.16;
  }

  if (t >= 1) {
    advancedCue.active = false;
    if (morpheusGroup) morpheusGroup.visible = false;
    if (redPillGroup) redPillGroup.visible = false;
    if (el.advancedCue) {
      el.advancedCue.hidden = true;
      el.advancedCue.classList.remove("is-visible");
    }
  }
}

// Pose values use a symmetric convention: positive Z = abduction for BOTH sides.
// applyPose maps to actual Three.js rotations (mirrors right side, negates knees).
function applyPose(d) {
  const baseY = BODY.uLegL + BODY.lLegL + BODY.footH + 0.6;
  bones.root.position.y = baseY + d.rootY;
  bones.root.position.x = d.rootX;
  bones.root.position.z = d.rootZ;
  bones.root.rotation.set(d.rootRotX * DEG, d.rootRotY * DEG, d.rootRotZ * DEG);
  bones.spine.rotation.set(d.spineX * DEG, d.spineY * DEG, d.spineZ * DEG);
  bones.head.rotation.set(d.headX * DEG, d.headY * DEG, 0);
  // Arms: left Z positive = abduct left, right Z negated so positive = abduct right
  bones.lArm.rotation.set(d.lArmX * DEG, 0, d.lArmZ * DEG);
  bones.lElbow.rotation.set(d.lElbow * DEG, 0, 0);       // positive = flexion ✓
  bones.rArm.rotation.set(d.rArmX * DEG, 0, -d.rArmZ * DEG);
  bones.rElbow.rotation.set(d.rElbow * DEG, 0, 0);
  // Legs: same mirror for Z; knees negated so positive = flexion (shin bends back)
  bones.lLeg.rotation.set(d.lLegX * DEG, 0, (d.lLegZ || 0) * DEG);
  bones.lKnee.rotation.set(-d.lKnee * DEG, 0, 0);
  bones.rLeg.rotation.set(d.rLegX * DEG, 0, -(d.rLegZ || 0) * DEG);
  bones.rKnee.rotation.set(-d.rKnee * DEG, 0, 0);
  bones.lFoot.rotation.set((d.lFootX || 0) * DEG, (d.lFootY || 0) * DEG, 0);
  bones.rFoot.rotation.set((d.rFootX || 0) * DEG, -(d.rFootY || 0) * DEG, 0);
}

function smoothStep(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function realisticCycle(raw, profile = {}) {
  const hold = profile.hold ?? 0.08;
  if (hold <= 0) return smoothStep(raw);
  if (raw <= hold) return 0;
  if (raw >= 1 - hold) return 1;
  return smoothStep((raw - hold) / (1 - hold * 2));
}

function lerpPose(a, b, t) {
  const r = {};
  const keys = new Set([...Object.keys(P._base), ...Object.keys(a || {}), ...Object.keys(b || {})]);
  keys.forEach(key => {
    const base = P._base[key] ?? 0;
    const av = Number.isFinite(a?.[key]) ? a[key] : base;
    const bv = Number.isFinite(b?.[key]) ? b[key] : base;
    r[key] = av + (bv - av) * t;
  });
  return r;
}

const MOTION_PROFILES = {
  default: { breathRoot: 0.05, breathSpine: 0.35, sway: 0.015, counterTwist: 0.4, hold: 0.08 },
  dynamic: { breathRoot: 0.03, breathSpine: 0.25, sway: 0.08, counterTwist: 1.8, headCounter: 1.1, stepLift: 0.05, hold: 0.02 },
  grounded: { breathRoot: 0.035, breathSpine: 0.28, sway: 0.02, counterTwist: 0.6, hold: 0.16 },
  seated: { breathRoot: 0.018, breathSpine: 0.18, sway: 0.005, counterTwist: 0.15, hold: 0.2 },
  supine: { breathRoot: 0.01, breathSpine: 0.08, sway: 0, counterTwist: 0, hold: 0.22 },
};

const DYNAMIC_ANIMS = new Set(["march", "side-step", "rotation", "punch", "dance-bounce", "step-touch", "grapevine", "cross-groove", "disco", "skater", "freestyle"]);
const GROUNDED_ANIMS = new Set(["squat", "chair", "low-lunge", "low-lunge-right", "warrior", "triangle", "triangle-right", "goddess", "pyramid-left", "pyramid-right", "skandasana-left", "skandasana-right", "side-stretch", "tree", "warrior-three", "fold", "wide-fold", "child-pose", "supported-forward-fold", "supported-bridge"]);
const SEATED_ANIMS = new Set(["seated", "belly-breath", "box-breath", "long-exhale", "sukhasana-breath", "vajrasana", "butterfly"]);
const SUPINE_ANIMS = new Set(["legs-up-wall", "shavasana"]);

function motionProfileFor(animKey) {
  if (DYNAMIC_ANIMS.has(animKey)) return MOTION_PROFILES.dynamic;
  if (SUPINE_ANIMS.has(animKey)) return MOTION_PROFILES.supine;
  if (SEATED_ANIMS.has(animKey)) return MOTION_PROFILES.seated;
  if (GROUNDED_ANIMS.has(animKey)) return MOTION_PROFILES.grounded;
  return MOTION_PROFILES.default;
}

function applyNaturalMotion(pose, animKey, time, rawCycle, pData) {
  const profile = motionProfileFor(animKey);
  const speed = pData?.speed || 1;
  const breathWave = Math.sin(time * 1.2);
  const sideWave = Math.sin(time * speed * Math.PI);
  const liftWave = Math.max(0, Math.sin(time * speed * Math.PI * 2));

  pose.rootY += breathWave * profile.breathRoot + liftWave * (profile.stepLift || 0);
  pose.spineX += breathWave * profile.breathSpine;
  pose.rootX += sideWave * (profile.sway || 0);
  pose.spineY += sideWave * (profile.counterTwist || 0);
  pose.headY -= sideWave * (profile.headCounter || 0);

  if (DYNAMIC_ANIMS.has(animKey)) {
    const softKnee = 1 + liftWave * 1.5;
    pose.lKnee += softKnee;
    pose.rKnee += softKnee;
  }

  if (rawCycle < 0.08 || rawCycle > 0.92) {
    const settle = rawCycle < 0.08 ? 1 - rawCycle / 0.08 : (rawCycle - 0.92) / 0.08;
    pose.rootY -= (profile.stepLift || 0.03) * settle * 0.5;
  }

  return pose;
}

// Transition state — caches the start pose to avoid sign-mismatch bugs
let targetPoseAnim = "rest";
let transitionStartPose = null;
let lastAppliedPose = null;
let transitionProgress = 1;
const TRANSITION_SPEED = 2.0;

function setupScene() {
  if (typeof THREE === "undefined") return;
  const stageEl = el.animationStage;
  const w = stageEl.clientWidth || 600;
  const h = Math.max(stageEl.clientHeight, 580);

  scene = new THREE.Scene();

  // Camera — wider FOV to frame full body (head to toes)
  camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
  camera.position.set(0, 5.5, 22);
  camera.lookAt(0, 5.0, 0);

  // Renderer
  renderer3d = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer3d.setSize(w, h);
  renderer3d.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer3d.shadowMap.enabled = true;
  renderer3d.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer3d.toneMapping = THREE.ACESFilmicToneMapping;
  renderer3d.toneMappingExposure = 1.1;
  stageEl.appendChild(renderer3d.domElement);
  ensurePoseOverlay(stageEl);
  resizePoseOverlay(w, h);
  setPoseOverlayVisible(state.neuralPoseEnabled);

  // Lighting
  const ambient = new THREE.AmbientLight(0xb8c4e0, 0.7);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff4e6, 1.8);
  key.position.set(4, 12, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1; key.shadow.camera.far = 30;
  key.shadow.camera.left = -6; key.shadow.camera.right = 6;
  key.shadow.camera.top = 14; key.shadow.camera.bottom = -2;
  key.shadow.bias = -0.002;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x7ec8e3, 0.5);
  rim.position.set(-3, 8, -5);
  scene.add(rim);

  const fill = new THREE.PointLight(0xffa07a, 0.3, 20);
  fill.position.set(-4, 4, 6);
  scene.add(fill);

  // Ground
  // Large ground plane visible from all camera angles
  const groundGeo = new THREE.CircleGeometry(8, 64);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.9, metalness: 0 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.01;
  ground.receiveShadow = true;
  scene.add(ground);

  // Ground ring
  const ringGeo = new THREE.RingGeometry(3.5, 3.7, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.15 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.01;
  scene.add(ring);

  // Outer ring for depth cue
  const outerRingGeo = new THREE.RingGeometry(5.5, 5.6, 64);
  const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.06 });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  outerRing.rotation.x = -Math.PI / 2;
  outerRing.position.y = 0.005;
  scene.add(outerRing);

  // Build the humanoid
  buildAvatar();
  buildMorpheusInstructor();
  applyMirrorGuide();

  // Enable shadows on avatar
  avatarGroup.traverse(child => {
    if (child.isMesh && !child.userData.isAirFlow) { child.castShadow = true; child.receiveShadow = true; }
  });
  morpheusGroup?.traverse(child => {
    if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
  });

  // Resize handler
  window.addEventListener("resize", () => {
    const ww = stageEl.clientWidth || 600;
    const hh = Math.max(stageEl.clientHeight, 580);
    camera.aspect = ww / hh;
    camera.updateProjectionMatrix();
    renderer3d.setSize(ww, hh);
    resizePoseOverlay(ww, hh);
  });

  // Animation loop
  let lastTime = performance.now();
  function animate() {
    requestAnimationFrame(animate);
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.05); // cap delta to avoid jumps
    lastTime = now;
    const time = now * 0.001;

    // Compute the current movement's target pose with eased, less robotic timing.
    const pData = P[targetPoseAnim] || P.rest;
    const breathingTrack = state.track === "breath";
    const rawCycle = breathingTrack ? 0 : (Math.sin(time * pData.speed * Math.PI - Math.PI / 2) + 1) / 2;
    const cycle = breathingTrack ? 0 : realisticCycle(rawCycle, motionProfileFor(targetPoseAnim));
    const exercisePose = breathingTrack ? lerpPose(pData.a, pData.a, 0) : lerpPose(pData.a, pData.b, cycle);
    if (!breathingTrack) applyNaturalMotion(exercisePose, targetPoseAnim, time, rawCycle, pData);

    // Smooth transition between exercises
    let finalPose;
    if (transitionProgress < 1) {
      transitionProgress = Math.min(1, transitionProgress + dt * TRANSITION_SPEED);
      finalPose = lerpPose(transitionStartPose, exercisePose, easeInOutCubic(transitionProgress));
    } else {
      finalPose = exercisePose;
    }

    applyPose(finalPose);
    lastAppliedPose = { ...finalPose };
    updateAdvancedCue(time, now);

    // Camera: smooth orbit + per-pose angles + full body framing
    updateCamera(time, dt);

    renderer3d.render(scene, camera);
    updateNeuralPose(now);
    updateCameraCoach(now);
    drawNeuralPose();
  }

  animate();
}

function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

// ═══════════════════════════════════════════════════════════
//  CAMERA SYSTEM — per-pose angles, orbit, full-body framing
//  angle: degrees around Y axis (0 = front, 90 = right side, 180 = back)
//  height: camera Y position
//  dist: distance from center
//  lookY: where the camera looks (vertical center of body)
//  orbit: degrees per second of slow auto-orbit (0 = static)
// ═══════════════════════════════════════════════════════════

const CAM_PRESETS = {
  march:          { angle: 15,  height: 5.5, dist: 22, lookY: 5.0, orbit: 0 },
  "side-step":    { angle: 10,  height: 5.5, dist: 22, lookY: 5.0, orbit: 0 },
  squat:          { angle: 65,  height: 4.5, dist: 21, lookY: 4.0, orbit: 0 },    // side view for form
  rotation:       { angle: 5,   height: 5.5, dist: 21, lookY: 5.0, orbit: 0 },
  punch:          { angle: 30,  height: 5.5, dist: 22, lookY: 5.0, orbit: 0 },    // 3/4 angle
  posture:        { angle: 160, height: 5.5, dist: 22, lookY: 5.0, orbit: 0 },    // BACK view to see shoulder blades
  mountain:       { angle: 0,   height: 5.5, dist: 22, lookY: 5.0, orbit: 12 },   // slow orbit
  sun:            { angle: 20,  height: 6.0, dist: 23, lookY: 5.5, orbit: 8 },
  chair:          { angle: 55,  height: 4.5, dist: 21, lookY: 4.0, orbit: 6 },    // side to see form
  "low-lunge":    { angle: 58,  height: 4.2, dist: 22, lookY: 3.8, orbit: 3 },
  warrior:        { angle: 0,   height: 5.0, dist: 24, lookY: 4.5, orbit: 10 },   // wide, front, orbits
  triangle:       { angle: 18,  height: 5.0, dist: 24, lookY: 4.4, orbit: 5 },
  "triangle-right": { angle: -18, height: 5.0, dist: 24, lookY: 4.4, orbit: 5 },
  goddess:        { angle: 0,   height: 4.9, dist: 23, lookY: 4.3, orbit: 6 },
  "pyramid-left": { angle: 58,  height: 4.0, dist: 22, lookY: 3.6, orbit: 1 },
  "pyramid-right": { angle: -58, height: 4.0, dist: 22, lookY: 3.6, orbit: 1 },
  "side-stretch": { angle: 0,   height: 6.0, dist: 22, lookY: 5.0, orbit: 0 },
  tree:           { angle: 10,  height: 5.5, dist: 22, lookY: 5.0, orbit: 14 },   // slow orbit for balance
  "warrior-three": { angle: 72, height: 5.6, dist: 40, lookY: 4.7, orbit: 1 },
  fold:           { angle: 75,  height: 3.5, dist: 19, lookY: 3.5, orbit: 0 },    // side view for hip hinge
  "wide-fold":    { angle: 18,  height: 3.6, dist: 21, lookY: 3.5, orbit: 3 },
  seated:         { angle: 5,   height: 2.5, dist: 17, lookY: 2.0, orbit: 10 },   // low, close
  "low-lunge-right": { angle: -58, height: 4.2, dist: 22, lookY: 3.8, orbit: 3 },
  "skandasana-left": { angle: 18, height: 3.8, dist: 23, lookY: 3.0, orbit: 2 },
  "skandasana-right": { angle: -18, height: 3.8, dist: 23, lookY: 3.0, orbit: 2 },
  "sukhasana-breath": { angle: 6, height: 2.7, dist: 17, lookY: 2.0, orbit: 4 },
  "child-pose": { angle: 38, height: 2.5, dist: 18, lookY: 1.7, orbit: 2 },
  vajrasana: { angle: 8, height: 2.8, dist: 17, lookY: 2.0, orbit: 4 },
  butterfly: { angle: 8, height: 2.5, dist: 17, lookY: 1.9, orbit: 5 },
  "supported-forward-fold": { angle: 35, height: 2.3, dist: 18, lookY: 1.7, orbit: 1 },
  "legs-up-wall": { angle: 70, height: 3.2, dist: 18, lookY: 2.0, orbit: 0 },
  "supported-bridge": { angle: 68, height: 2.8, dist: 18, lookY: 1.9, orbit: 0 },
  shavasana: { angle: 72, height: 2.4, dist: 18, lookY: 1.7, orbit: 0 },
  "belly-breath": { angle: 0, height: 5.45, dist: 4.25, lookY: 5.25, orbit: 0 },
  "box-breath":   { angle: 0, height: 5.45, dist: 4.0, lookY: 5.25, orbit: 0 },
  "long-exhale":  { angle: -8, height: 2.7, dist: 17, lookY: 2.0, orbit: 3 },
  "dance-bounce": { angle: 18,  height: 5.2, dist: 22, lookY: 4.8, orbit: 8 },
  "step-touch":   { angle: 14,  height: 5.3, dist: 22, lookY: 4.8, orbit: 4 },
  grapevine:      { angle: 20,  height: 5.2, dist: 22, lookY: 4.7, orbit: 6 },
  "cross-groove": { angle: 24,  height: 5.2, dist: 21, lookY: 4.8, orbit: 4 },
  disco:          { angle: 28,  height: 5.8, dist: 22, lookY: 5.1, orbit: 10 },
  skater:         { angle: 18,  height: 4.9, dist: 22, lookY: 4.2, orbit: 4 },
  freestyle:      { angle: 22,  height: 5.3, dist: 23, lookY: 4.9, orbit: 12 },
  rest:           { angle: 0,   height: 5.5, dist: 22, lookY: 5.0, orbit: 6 },
};

const CAM_DEFAULT = { angle: 0, height: 5.5, dist: 22, lookY: 5.0, orbit: 0 };

// Smooth camera state
let camCurrent = { angle: 0, height: 5.5, dist: 22, lookY: 5.0, orbit: 0 };
let camTarget  = { ...camCurrent };
const CAM_LERP_SPEED = 1.8; // per second

function setCameraTarget(animKey) {
  camTarget = { ...(CAM_PRESETS[animKey] || CAM_DEFAULT) };
}

function updateCamera(time, dt) {
  // Smoothly interpolate toward target
  const t = Math.min(1, dt * CAM_LERP_SPEED);
  camCurrent.height = camCurrent.height + (camTarget.height - camCurrent.height) * t;
  camCurrent.dist = camCurrent.dist + (camTarget.dist - camCurrent.dist) * t;
  camCurrent.lookY = camCurrent.lookY + (camTarget.lookY - camCurrent.lookY) * t;
  camCurrent.orbit = camCurrent.orbit + (camTarget.orbit - camCurrent.orbit) * t;

  // For angle, handle wrap-around (shortest path)
  let angleDiff = camTarget.angle - camCurrent.angle;
  if (angleDiff > 180) angleDiff -= 360;
  if (angleDiff < -180) angleDiff += 360;
  camCurrent.angle += angleDiff * t;

  // Apply orbit rotation on top of base angle
  const orbitOffset = camCurrent.orbit > 0 ? time * camCurrent.orbit : 0;
  const finalAngle = (camCurrent.angle + orbitOffset) * DEG;

  // Slight natural sway
  const swayX = Math.sin(time * 0.12) * 0.15;
  const swayY = Math.sin(time * 0.18) * 0.08;

  // Spherical to cartesian
  camera.position.x = Math.sin(finalAngle) * camCurrent.dist + swayX;
  camera.position.z = Math.cos(finalAngle) * camCurrent.dist;
  camera.position.y = camCurrent.height + swayY;
  camera.lookAt(0, camCurrent.lookY, 0);
}

function transitionToAnimation(animKey) {
  if (animKey === targetPoseAnim && transitionProgress >= 1) return;
  transitionStartPose = lastAppliedPose ? { ...lastAppliedPose } : { ...P._base };
  targetPoseAnim = animKey;
  transitionProgress = 0;
  setCameraTarget(animKey);
}

// ═══════════════════════════════════════════════════════════
//  VOICE SYSTEM
// ═══════════════════════════════════════════════════════════

let selectedVoice = null;
let speechPrimed = false;
let speechTimer = null;
const NATURAL_VOICE_HINTS = ["Google US English", "Google UK English", "Microsoft Aria", "Microsoft Guy", "Microsoft Jenny", "Siri", "Daniel", "Alex"];

function pickVoice(voices) {
  const en = voices.filter(v => v.lang && v.lang.startsWith("en"));
  for (const hint of NATURAL_VOICE_HINTS) {
    const match = en.find(v => v.name.includes(hint));
    if (match) return match;
  }
  return en.find(v => /natural|premium|enhanced/i.test(v.name)) || en[0] || voices[0] || null;
}
function loadVoices() {
  const v = window.speechSynthesis?.getVoices() || [];
  if (v.length) selectedVoice = pickVoice(v);
}
if ("speechSynthesis" in window) { loadVoices(); window.speechSynthesis.addEventListener("voiceschanged", loadVoices); }

function primeSpeech() {
  if (!("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  loadVoices();
  synth.resume();
  if (speechPrimed) return;
  speechPrimed = true;
  try {
    const warmup = new SpeechSynthesisUtterance(".");
    warmup.volume = 0;
    warmup.rate = 1;
    warmup.pitch = 1;
    synth.speak(warmup);
  } catch { /* no-op */ }
}

function noteInteraction() {
  state.hasUserInteracted = true;
  primeSpeech();
}

function speak(text) {
  if (!state.voiceEnabled || !state.hasUserInteracted || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  clearTimeout(speechTimer);
  primeSpeech();
  speechTimer = window.setTimeout(() => {
    try {
      loadVoices();
      synth.resume();
      if (synth.speaking || synth.pending) synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (selectedVoice) u.voice = selectedVoice;
      u.lang = (selectedVoice && selectedVoice.lang) || "en-US";
      const voice = cfg().voice || {};
      u.rate = voice.rate ?? 0.96;
      u.pitch = voice.pitch ?? 1;
      u.volume = voice.volume ?? 0.95;
      synth.speak(u);
    } catch { /* no-op */ }
  }, 50);
}

// ═══════════════════════════════════════════════════════════
//  APP STATE + UI
// ═══════════════════════════════════════════════════════════

const state = { track: "exercise", level: "beginner", yogaSection: "flow", breathOption: "classic", breathMinutes: 5, routine: [], customExercises: [], stepIndex: 0, remaining: 0, running: false, tickId: null, cueId: null, cueIndex: 0, voiceEnabled: true, neuralPoseEnabled: true, mirrorGuideEnabled: true, cameraCoachEnabled: false, hasUserInteracted: false };
state.routine = buildRoutine(state.track, state.level);

const $ = id => document.getElementById(id);
const el = {
  heroTitle: $("hero-title"), heroText: $("hero-text"), goalRow: $("goal-row"),
  sessionNote: $("session-note"), trackExerciseBtn: $("track-exercise-btn"),
  trackYogaBtn: $("track-yoga-btn"), trackDanceBtn: $("track-dance-btn"),
  trackBreathBtn: $("track-breath-btn"),
  levelBeginnerBtn: $("level-beginner-btn"),
  levelAdvancedBtn: $("level-advanced-btn"),
  yogaSectionPicker: $("yoga-section-picker"),
  yogaSectionFlowBtn: $("yoga-section-flow-btn"),
  yogaSectionRelaxBtn: $("yoga-section-relax-btn"),
  breathOptionPicker: $("breath-option-picker"),
  breathDurationPicker: $("breath-duration-picker"),
  breathCustomMinutes: $("breath-custom-minutes"),
  timerRing: $("timer-ring"),
  remainingTime: $("remaining-time"), stepCount: $("step-count"),
  stepType: $("step-type"), stepTarget: $("step-target"), breathPhase: $("breath-phase"),
  breathBoxGuide: $("breath-box-guide"), breathBox: $("breath-box"),
  boxPhaseLabel: $("box-phase-label"), boxPhaseCount: $("box-phase-count"),
  boxCycleCount: $("box-cycle-count"),
  startBtn: $("start-btn"), pauseBtn: $("pause-btn"),
  nextBtn: $("next-btn"), restartBtn: $("restart-btn"),
  voiceBtn: $("voice-btn"), neuralPoseBtn: $("neural-pose-btn"),
  mirrorGuideBtn: $("mirror-guide-btn"), cameraCoachBtn: $("camera-coach-btn"),
  exerciseStudioBtn: $("exercise-studio-btn"), burstBtn: $("burst-btn"),
  currentName: $("current-name"), currentFocus: $("current-focus"),
  currentSummary: $("current-summary"), coachCue: $("coach-cue"),
  instructionList: $("instruction-list"), upNext: $("up-next"),
  sessionProgressFill: $("session-progress-fill"),
  sessionProgressCopy: $("session-progress-copy"),
  interactiveTip: $("interactive-tip"), totalTime: $("total-time"),
  stepList: $("step-list"), noteList: $("note-list"),
  motivationBurst: $("motivation-burst"), animationStage: $("animation-stage"),
  advancedCue: $("advanced-cue"),
  stageBreathCue: $("stage-breath-cue"),
  stageBreathArrow: $("stage-breath-arrow"),
  stageBreathLabel: $("stage-breath-label"),
  stageBreathCount: $("stage-breath-count"),
  stageBreathDirection: $("stage-breath-direction"),
  tutorialPanel: $("tutorial-panel"), tutorialLabel: $("tutorial-label"),
  tutorialTitle: $("tutorial-title"), tutorialKicker: $("tutorial-kicker"),
  tutorialSummary: $("tutorial-summary"), tutorialBody: $("tutorial-body"),
  cameraCoachPanel: $("camera-coach-panel"), cameraStopBtn: $("camera-stop-btn"),
  cameraVideo: $("camera-video"), userPoseCanvas: $("user-pose-canvas"),
  cameraLoading: $("camera-loading"), framingGuidance: $("framing-guidance"),
  framingTitle: $("framing-title"), framingDetail: $("framing-detail"),
  matchScore: $("match-score"), matchMeterFill: $("match-meter-fill"), matchLabel: $("match-label"),
  visibilityScore: $("visibility-score"), repCount: $("rep-count"), holdTime: $("hold-time"), bestScore: $("best-score"),
  coachDirectionTitle: $("coach-direction-title"), coachDirectionCopy: $("coach-direction-copy"),
  sessionHistory: $("session-history"),
  exerciseStudioPanel: $("exercise-studio-panel"), exerciseStudioCloseBtn: $("exercise-studio-close-btn"),
  exerciseForm: $("exercise-form"), exerciseAnimation: $("exercise-animation"),
  exerciseSaveStatus: $("exercise-save-status"), customExerciseList: $("custom-exercise-list"),
};
el.voiceBtnLabel = el.voiceBtn ? el.voiceBtn.querySelector("[data-label]") : null;
el.neuralPoseBtnLabel = el.neuralPoseBtn ? el.neuralPoseBtn.querySelector("[data-neural-label]") : null;
el.mirrorGuideBtnLabel = el.mirrorGuideBtn ? el.mirrorGuideBtn.querySelector("[data-mirror-label]") : null;
el.cameraCoachBtnLabel = el.cameraCoachBtn ? el.cameraCoachBtn.querySelector("[data-camera-label]") : null;
el.breathOptionBtns = Array.from(document.querySelectorAll("[data-breath-option]"));
el.breathDurationBtns = Array.from(document.querySelectorAll("[data-breath-minutes]"));
el.breathBoxSides = Array.from(document.querySelectorAll("[data-box-side]"));

function cfg() {
  const base = tracks[state.track];
  if (state.track !== "yoga" || state.yogaSection === "flow") return base;
  const section = yogaSections[state.yogaSection] || yogaSections.flow;
  return {
    ...base,
    ...section,
    descriptions: { ...base.descriptions, ...(section.descriptions || {}) },
    voice: { ...base.voice, ...(section.voice || {}) },
  };
}
function routine() { return state.routine; }
function step() { return routine()[state.stepIndex]; }
function fmtSec(s) { return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
function fmtDur(s) { const m = Math.floor(s / 60), r = s % 60; return m ? (r ? `${m} min ${r} sec` : `${m} min`) : `${r} sec`; }
function totalTime() { return routine().reduce((a, s) => a + s.duration, 0); }
function doneTime() { return routine().slice(0, state.stepIndex).reduce((a, s) => a + s.duration, 0) + (step().duration - state.remaining); }
function rndPrompt() { const p = cfg().prompts; return p[Math.floor(Math.random() * p.length)]; }

function showBurst(text) {
  el.motivationBurst.textContent = text;
  el.motivationBurst.animate([{ opacity: 0.2, transform: "translateY(12px) scale(0.94)" }, { opacity: 1, transform: "translateY(0) scale(1)" }], { duration: 360, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" });
}

function resetCameraStats() {
  Object.assign(cameraCoach, {
    lastDetectAt: 0,
    lastFrameAt: 0,
    smoothedScore: 0,
    bestScore: 0,
    scoreTotal: 0,
    sampleCount: 0,
    reps: 0,
    holdMs: 0,
    repArmed: true,
    lastCue: "",
    lastCueAt: 0,
    startedAt: performance.now(),
  });
  renderCameraStats(0, null);
}

async function renderSessionHistory() {
  if (!el.sessionHistory) return;
  const sessions = await window.ReverbereshStore?.listSessions?.(8) || [];
  el.sessionHistory.innerHTML = "";
  if (!sessions.length) {
    const empty = appendText(document.createElement("p"), "Completed camera sessions will appear here.");
    empty.className = "history-empty";
    el.sessionHistory.appendChild(empty);
    return;
  }
  sessions.forEach(session => {
    const item = document.createElement("article");
    item.className = "history-item";
    item.appendChild(appendText(document.createElement("strong"), session.movement));
    const score = appendText(document.createElement("span"), `${session.averageScore}% average · ${session.bestScore}% best`);
    score.className = "history-score";
    item.appendChild(score);
    item.appendChild(appendText(document.createElement("span"), `${session.reps} reps · ${session.holdSeconds}s matched hold`));
    item.appendChild(appendText(document.createElement("span"), new Date(session.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })));
    el.sessionHistory.appendChild(item);
  });
}

async function saveCameraSession() {
  if (cameraCoach.sampleCount < 5 || !window.ReverbereshStore) return;
  await window.ReverbereshStore.saveSession({
    movement: step()?.name || "Movement session",
    track: state.track,
    level: state.level,
    averageScore: Math.round(cameraCoach.scoreTotal / cameraCoach.sampleCount),
    bestScore: Math.round(cameraCoach.bestScore),
    reps: cameraCoach.reps,
    holdSeconds: Math.floor(cameraCoach.holdMs / 1000),
    durationSeconds: Math.max(1, Math.round((performance.now() - cameraCoach.startedAt) / 1000)),
  });
}

async function startCameraCoach() {
  noteInteraction();
  if (cameraCoach.active) return stopCameraCoach();
  if (state.track === "breath") {
    showBurst("Camera coach is for movement tracks");
    speak("Choose workout, yoga, or dance before starting camera coach.");
    return;
  }
  el.cameraCoachPanel.hidden = false;
  el.cameraLoading.hidden = false;
  el.framingGuidance.dataset.state = "setup";
  el.framingTitle.textContent = "Allow camera access";
  el.framingDetail.textContent = "Your video stays on this device.";
  el.cameraCoachPanel.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error("Camera access requires HTTPS or localhost.");
    cameraCoach.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    el.cameraVideo.srcObject = cameraCoach.stream;
    await el.cameraVideo.play();
    neuralPose.failed = false;
    await initNeuralPose();
    if (!neuralPose.ready) throw new Error("The pose model could not start. Check the network connection and reload.");

    neuralPose.result = null;
    cameraCoach.active = true;
    state.cameraCoachEnabled = true;
    resetCameraStats();
    el.cameraLoading.hidden = true;
    el.cameraCoachBtn.classList.add("is-active");
    if (el.cameraCoachBtnLabel) el.cameraCoachBtnLabel.textContent = "Camera coach on";
    el.framingTitle.textContent = "Stand where your full body is visible";
    el.framingDetail.textContent = "Leave space above your head and below your feet.";
    showBurst("Camera coach ready");
    await renderSessionHistory();
  } catch (error) {
    cameraCoach.stream?.getTracks().forEach(track => track.stop());
    cameraCoach.stream = null;
    el.cameraLoading.hidden = true;
    el.framingGuidance.dataset.state = "error";
    el.framingTitle.textContent = "Camera coach could not start";
    el.framingDetail.textContent = error?.name === "NotAllowedError" ? "Allow camera access in the browser, then try again." : (error?.message || "Check camera access and try again.");
    console.warn("Camera coach could not start.", error);
  }
}

async function stopCameraCoach({ save = true, hide = true } = {}) {
  if (save) await saveCameraSession();
  cameraCoach.active = false;
  state.cameraCoachEnabled = false;
  cameraCoach.stream?.getTracks().forEach(track => track.stop());
  cameraCoach.stream = null;
  if (el.cameraVideo) el.cameraVideo.srcObject = null;
  const ctx = el.userPoseCanvas?.getContext("2d");
  if (ctx) ctx.clearRect(0, 0, el.userPoseCanvas.width, el.userPoseCanvas.height);
  el.cameraCoachBtn?.classList.remove("is-active");
  if (el.cameraCoachBtnLabel) el.cameraCoachBtnLabel.textContent = "Camera coach";
  if (hide && el.cameraCoachPanel) el.cameraCoachPanel.hidden = true;
  await renderSessionHistory();
}

function humanizeAnimation(key) {
  return key.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function populateAnimationOptions() {
  if (!el.exerciseAnimation) return;
  el.exerciseAnimation.innerHTML = "";
  Object.keys(P).filter(key => key !== "_base").sort().forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = humanizeAnimation(key);
    el.exerciseAnimation.appendChild(option);
  });
}

function renderCustomExerciseList() {
  if (!el.customExerciseList) return;
  el.customExerciseList.innerHTML = "";
  if (!state.customExercises.length) {
    const empty = appendText(document.createElement("p"), "No custom exercises yet. Define one using the form.");
    empty.className = "history-empty";
    el.customExerciseList.appendChild(empty);
    return;
  }
  state.customExercises.forEach(exercise => {
    const item = document.createElement("article");
    item.className = "custom-exercise-item";
    const copy = document.createElement("div");
    copy.appendChild(appendText(document.createElement("strong"), exercise.name));
    copy.appendChild(appendText(document.createElement("span"), `${tracks[exercise.track]?.label || exercise.track} · ${exercise.duration}s · ${humanizeAnimation(exercise.animation)}`));
    const remove = appendText(document.createElement("button"), "×");
    remove.type = "button";
    remove.className = "icon-action";
    remove.title = `Delete ${exercise.name}`;
    remove.setAttribute("aria-label", `Delete ${exercise.name}`);
    remove.addEventListener("click", async () => {
      if (!window.confirm(`Delete ${exercise.name}?`)) return;
      await window.ReverbereshStore?.deleteExercise?.(exercise.id);
      state.customExercises = state.customExercises.filter(item => item.id !== exercise.id);
      renderCustomExerciseList();
      resetSession(false);
    });
    item.append(copy, remove);
    el.customExerciseList.appendChild(item);
  });
}

function openExerciseStudio() {
  el.exerciseStudioPanel.hidden = false;
  const trackInput = el.exerciseForm?.elements?.track;
  if (trackInput) trackInput.value = state.track;
  if (el.exerciseAnimation && P[step()?.animation]) el.exerciseAnimation.value = step().animation;
  el.exerciseStudioPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  renderCustomExerciseList();
}

function closeExerciseStudio() {
  el.exerciseStudioPanel.hidden = true;
}

async function saveCustomExercise(event) {
  event.preventDefault();
  const formData = new FormData(el.exerciseForm);
  const lines = value => String(value || "").split("\n").map(line => line.trim()).filter(Boolean);
  const exercise = {
    name: String(formData.get("name") || "").trim(),
    track: String(formData.get("track") || "exercise"),
    level: String(formData.get("level") || "both"),
    duration: Math.max(10, Math.min(600, Number(formData.get("duration")) || 30)),
    animation: String(formData.get("animation") || "rest"),
    focus: String(formData.get("focus") || "").trim(),
    summary: String(formData.get("summary") || "").trim(),
    instructions: lines(formData.get("instructions")),
    cues: lines(formData.get("cues")),
  };
  if (!exercise.name || !exercise.focus || !exercise.summary || !exercise.instructions.length || !exercise.cues.length) return;
  const saved = await window.ReverbereshStore.saveExercise(exercise);
  state.customExercises = [saved, ...state.customExercises.filter(item => item.id !== saved.id)];
  el.exerciseSaveStatus.textContent = `${saved.name} added to ${tracks[saved.track]?.label || saved.track}.`;
  el.exerciseForm.reset();
  renderCustomExerciseList();
  if (saved.track === state.track) resetSession(false);
}

function activeTutorial() {
  if (state.track === "yoga" && state.yogaSection === "relax") return BP_YOGA_TUTORIAL;
  if (state.track === "breath") return BREATH_TUTORIAL;
  return null;
}

function appendText(elm, text) {
  elm.textContent = text;
  return elm;
}

function renderTutorial() {
  if (!el.tutorialPanel || !el.tutorialBody) return;
  const tutorial = activeTutorial();
  el.tutorialPanel.hidden = !tutorial;
  el.tutorialBody.innerHTML = "";
  if (!tutorial) return;

  el.tutorialLabel.textContent = tutorial.label;
  el.tutorialTitle.textContent = tutorial.title;
  el.tutorialKicker.textContent = tutorial.kicker;
  el.tutorialSummary.textContent = tutorial.summary;

  const stepGrid = document.createElement("div");
  stepGrid.className = "tutorial-step-grid";
  tutorial.steps.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "tutorial-step-card";
    const number = appendText(document.createElement("span"), String(index + 1));
    number.className = "tutorial-step-number";
    const copy = document.createElement("div");
    const title = appendText(document.createElement("h3"), item.name);
    const breath = appendText(document.createElement("p"), item.breath);
    breath.className = "tutorial-step-breath";
    const cue = appendText(document.createElement("p"), item.cue);
    cue.className = "tutorial-step-cue";
    copy.append(title, breath, cue);
    card.append(number, copy);
    stepGrid.appendChild(card);
  });
  el.tutorialBody.appendChild(stepGrid);

  if (!tutorial.media?.length) return;
  const mediaGrid = document.createElement("div");
  mediaGrid.className = "tutorial-media-grid";
  tutorial.media.forEach(item => {
    const isEmbeddedVideo = item.type === "video" && item.embed;
    const link = document.createElement(isEmbeddedVideo ? "article" : "a");
    link.className = `tutorial-media-card is-${item.type}`;
    if (!isEmbeddedVideo) {
      link.href = item.href || item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    if (isEmbeddedVideo) {
      const iframe = document.createElement("iframe");
      iframe.src = item.embed;
      iframe.title = item.title;
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      link.appendChild(iframe);
      const badge = appendText(document.createElement("span"), "Video");
      badge.className = "media-kind";
      link.appendChild(badge);
    } else if (item.type === "image" || item.type === "video") {
      const img = document.createElement("img");
      img.src = item.thumbnail || item.url;
      img.alt = item.title;
      img.loading = "lazy";
      link.appendChild(img);
      const badge = appendText(document.createElement("span"), item.type === "video" ? "Video" : "Image");
      badge.className = "media-kind";
      link.appendChild(badge);
    }

    const copy = document.createElement("div");
    copy.className = "tutorial-media-copy";
    copy.appendChild(appendText(document.createElement("strong"), item.title));
    copy.appendChild(appendText(document.createElement("span"), item.credit ? `${item.source} - ${item.credit}` : item.source));
    if (isEmbeddedVideo) {
      const sourceLink = appendText(document.createElement("a"), "Open video source");
      sourceLink.href = item.url;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      sourceLink.className = "tutorial-source-link";
      copy.appendChild(sourceLink);
    }
    link.appendChild(copy);
    mediaGrid.appendChild(link);
  });
  el.tutorialBody.appendChild(mediaGrid);
}

function updateHero() {
  const t = cfg(); document.body.dataset.track = state.track;
  document.body.dataset.yogaSection = state.track === "yoga" ? state.yogaSection : "";
  document.body.dataset.mirrorGuide = state.mirrorGuideEnabled ? "on" : "off";
  el.heroTitle.textContent = t.heroTitle; el.heroText.textContent = t.heroText;
  el.sessionNote.textContent = state.track === "breath" ? `${t.descriptions[state.level]} Session length: ${state.breathMinutes} minutes.` : t.descriptions[state.level]; el.interactiveTip.textContent = t.tip;
  el.burstBtn.textContent = t.burstLabel;
  if (el.yogaSectionPicker) el.yogaSectionPicker.hidden = state.track !== "yoga";
  if (el.breathOptionPicker) el.breathOptionPicker.hidden = state.track !== "breath";
  if (el.breathDurationPicker) el.breathDurationPicker.hidden = state.track !== "breath";
  el.goalRow.innerHTML = ""; t.goals.forEach(g => { const s = document.createElement("span"); s.className = "goal-pill"; s.textContent = g; el.goalRow.appendChild(s); });
  el.noteList.innerHTML = ""; t.notes.forEach(n => { const li = document.createElement("li"); li.textContent = n; el.noteList.appendChild(li); });
  renderTutorial();

  // Update avatar shirt color based on track
  if (avatarGroup) {
    const yogaShirtColor = state.yogaSection === "relax" ? 0x14b8a6 : 0x059669;
    const shirtColors = { exercise: 0x2563eb, yoga: yogaShirtColor, dance: 0xf97316, breath: 0x0891b2 };
    const shirtColor = shirtColors[state.track] || shirtColors.exercise;
    avatarGroup.traverse(child => {
      if (child.isMesh && child.material && child.material.color) {
        const hex = child.material.color.getHex();
        if (hex === 0x2563eb || hex === 0x059669 || hex === 0xf97316 || hex === 0x7c3aed || hex === 0x0891b2 || hex === 0x14b8a6) child.material.color.setHex(shirtColor);
      }
    });
  }
}

function updateSel() {
  el.trackExerciseBtn.classList.toggle("is-active", state.track === "exercise");
  el.trackYogaBtn.classList.toggle("is-active", state.track === "yoga");
  el.trackDanceBtn.classList.toggle("is-active", state.track === "dance");
  el.trackBreathBtn.classList.toggle("is-active", state.track === "breath");
  if (el.yogaSectionFlowBtn) el.yogaSectionFlowBtn.classList.toggle("is-active", state.yogaSection === "flow");
  if (el.yogaSectionRelaxBtn) el.yogaSectionRelaxBtn.classList.toggle("is-active", state.yogaSection === "relax");
  if (el.yogaSectionPicker) el.yogaSectionPicker.hidden = state.track !== "yoga";
  if (el.breathOptionPicker) el.breathOptionPicker.hidden = state.track !== "breath";
  if (el.breathDurationPicker) el.breathDurationPicker.hidden = state.track !== "breath";
  el.breathOptionBtns.forEach(btn => btn.classList.toggle("is-active", btn.dataset.breathOption === state.breathOption));
  el.breathDurationBtns.forEach(btn => btn.classList.toggle("is-active", Number(btn.dataset.breathMinutes) === state.breathMinutes));
  if (el.breathCustomMinutes) el.breathCustomMinutes.value = String(state.breathMinutes);
  el.levelBeginnerBtn.classList.toggle("is-active", state.level === "beginner");
  el.levelAdvancedBtn.classList.toggle("is-active", state.level === "advanced");
  el.voiceBtn.classList.toggle("is-active", state.voiceEnabled);
  el.neuralPoseBtn.classList.toggle("is-active", state.neuralPoseEnabled);
  if (el.mirrorGuideBtn) el.mirrorGuideBtn.classList.toggle("is-active", state.mirrorGuideEnabled);
  if (el.cameraCoachBtn) el.cameraCoachBtn.classList.toggle("is-active", state.cameraCoachEnabled);
  if (el.voiceBtnLabel) el.voiceBtnLabel.textContent = state.voiceEnabled ? "Voice cues on" : "Voice cues off";
  if (el.neuralPoseBtnLabel) el.neuralPoseBtnLabel.textContent = state.neuralPoseEnabled ? "Hide guide lines" : "Show guide lines";
  if (el.mirrorGuideBtnLabel) el.mirrorGuideBtnLabel.textContent = state.mirrorGuideEnabled ? "Mirror on" : "Mirror off";
  if (el.cameraCoachBtnLabel) el.cameraCoachBtnLabel.textContent = state.cameraCoachEnabled ? "Camera coach on" : "Camera coach";
}

function buildStepList() {
  el.stepList.innerHTML = "";
  routine().forEach((s, i) => {
    const c = document.createElement("article"); c.className = "step-card"; c.dataset.index = String(i);
    const title = s.type === "rest" ? "Reset / Rest" : s.name;
    const meta = s.type === "rest" ? s.focus : `${s.target} · ${s.focus}`;
    c.innerHTML = `<div class="step-index">${i + 1}</div><div class="step-copy"><p class="step-title">${title}</p><p class="step-meta">${meta}</p></div><div class="step-duration">${s.duration}s</div>`;
    c.addEventListener("click", () => { jumpToStep(i); });
    el.stepList.appendChild(c);
  });
}

function updateStepCards() { el.stepList.querySelectorAll(".step-card").forEach((c, i) => c.classList.toggle("is-current", i === state.stepIndex)); }
function updateInstr(s) { el.instructionList.innerHTML = ""; s.instructions.forEach(t => { const li = document.createElement("li"); li.textContent = t; el.instructionList.appendChild(li); }); }
function updateProg() { el.sessionProgressFill.style.width = `${(doneTime() / totalTime()) * 100}%`; el.sessionProgressCopy.textContent = `${fmtSec(doneTime())} completed`; }
function breathPhaseFor(s) {
  if (!s.breathPattern?.length) return null;
  const total = s.breathPattern.reduce((sum, item) => sum + item.duration, 0);
  if (!total) return null;
  const elapsed = Math.max(0, s.duration - state.remaining);
  const totalCycles = Math.max(1, Math.ceil(s.duration / total));
  const cycleIndex = Math.min(totalCycles, Math.floor(elapsed / total) + 1);
  let cursor = elapsed % total;
  for (const item of s.breathPattern) {
    if (cursor < item.duration) {
      return {
        ...item,
        remaining: Math.max(1, item.duration - Math.floor(cursor)),
        elapsedInPhase: Math.floor(cursor),
        cycleIndex,
        totalCycles,
      };
    }
    cursor -= item.duration;
  }
  const last = s.breathPattern[s.breathPattern.length - 1];
  return { ...last, remaining: 1, elapsedInPhase: last.duration - 1, cycleIndex, totalCycles };
}

function renderBreathBox(s, phaseInfo) {
  if (!el.breathBoxGuide) return;
  const show = state.track === "breath" && Boolean(s?.boxGuide && phaseInfo);
  el.breathBoxGuide.hidden = !show;
  if (!show) return;

  if (el.breathBox) el.breathBox.dataset.phase = phaseInfo.key;
  if (el.boxPhaseLabel) el.boxPhaseLabel.textContent = phaseInfo.label;
  if (el.boxPhaseCount) el.boxPhaseCount.textContent = `${phaseInfo.remaining}s`;
  if (el.boxCycleCount) el.boxCycleCount.textContent = `Cycle ${phaseInfo.cycleIndex} / ${phaseInfo.totalCycles}`;

  el.breathBoxSides.forEach(side => {
    const key = side.dataset.boxSide;
    const matching = s.breathPattern.find(item => item.key === key);
    side.classList.toggle("is-active", key === phaseInfo.key);
    const countEl = side.querySelector("[data-box-count]");
    if (countEl && matching) countEl.textContent = `${matching.duration}s`;
  });
}

function renderStageBreathCue(phaseInfo) {
  if (!el.stageBreathCue) return;
  const show = state.track === "breath" && Boolean(phaseInfo);
  el.stageBreathCue.hidden = !show;
  if (!show) return;
  const inhaling = phaseInfo.key === "inhale";
  const exhaling = phaseInfo.key === "exhale";
  el.stageBreathCue.dataset.phase = phaseInfo.key;
  if (el.stageBreathArrow) el.stageBreathArrow.textContent = inhaling ? "↑" : exhaling ? "↓" : "•";
  if (el.stageBreathLabel) el.stageBreathLabel.textContent = phaseInfo.label;
  if (el.stageBreathCount) el.stageBreathCount.textContent = `${phaseInfo.remaining}s`;
  if (el.stageBreathDirection) {
    el.stageBreathDirection.textContent = inhaling
      ? "Air moves upward"
      : exhaling
        ? "Air moves downward"
        : "Hold softly";
  }
}

function updateBreathPhase(s) {
  const phaseInfo = breathPhaseFor(s);
  renderBreathBox(s, phaseInfo);
  renderStageBreathCue(phaseInfo);
  if (!el.breathPhase) return phaseInfo;
  el.breathPhase.hidden = !phaseInfo;
  if (!phaseInfo) return null;
  el.breathPhase.textContent = `${phaseInfo.label} ${phaseInfo.remaining}s - cycle ${phaseInfo.cycleIndex}/${phaseInfo.totalCycles}`;
  el.breathPhase.dataset.phase = phaseInfo.key;
  el.coachCue.textContent = `${phaseInfo.label}: ${phaseInfo.cue}`;
  return phaseInfo;
}

function updateTimer(s) {
  el.remainingTime.textContent = String(state.remaining);
  el.stepCount.textContent = `Step ${state.stepIndex + 1} of ${routine().length}`;
  el.stepType.textContent = s.type === "rest" ? "Reset" : cfg().label;
  el.stepTarget.textContent = s.target;
  el.timerRing.style.setProperty("--ring-progress", String((state.remaining / s.duration) * 100));
  return updateBreathPhase(s);
}
function fmtPreview(s) { return s.type === "rest" ? `Reset for ${s.duration} seconds.` : `${s.name} for ${s.target}.`; }
function schedCue(s) {
  clearInterval(state.cueId);
  state.cueIndex = 0;
  if (s.breathPattern?.length) {
    updateBreathPhase(s);
    return;
  }
  el.coachCue.textContent = s.cues[0];
  state.cueId = setInterval(() => { state.cueIndex = (state.cueIndex + 1) % s.cues.length; el.coachCue.textContent = s.cues[state.cueIndex]; }, 4500);
}

function renderStep(announce = true) {
  const s = step(), next = routine()[state.stepIndex + 1];
  el.currentName.textContent = s.type === "rest" ? "Reset / Rest" : s.name;
  el.currentFocus.textContent = s.focus; el.currentSummary.textContent = s.summary;
  el.upNext.textContent = next ? fmtPreview(next) : "Final block. Stay easy through the finish.";
  updateSel(); updateInstr(s); updateStepCards(); updateProg(); updateTimer(s); schedCue(s);
  transitionToAnimation(s.animation);
  showBurst(s.type === "rest" ? "Take a breath" : s.name);
  if (!announce) return;
  speak(s.type === "rest" ? `Reset. ${s.instructions[0]} ${rndPrompt()}` : `${s.name}. ${s.instructions[0]} ${rndPrompt()}`);
}

function stopTimer() { state.running = false; clearInterval(state.tickId); state.tickId = null; el.startBtn.textContent = "Start"; }
function resetSession(announce = true) { stopTimer(); state.routine = buildRoutine(state.track, state.level); state.stepIndex = 0; state.remaining = routine()[0].duration; updateHero(); buildStepList(); el.totalTime.textContent = fmtDur(totalTime()); renderStep(announce); }
function switchTrack(t) {
  if (t === state.track) return;
  if (t === "breath" && cameraCoach.active) stopCameraCoach();
  state.track = t;
  noteInteraction();
  resetSession(true);
}
function triggerAdvancedCue() {
  advancedCue.active = true;
  advancedCue.startedAt = performance.now();
  if (el.advancedCue) {
    el.advancedCue.hidden = false;
    el.advancedCue.classList.remove("is-visible");
    void el.advancedCue.offsetWidth;
    el.advancedCue.classList.add("is-visible");
  }
  const line = "Morpheus: I'll show you how deep the rabbit hole goes.";
  showBurst(line);
  speak(line);
}
function switchLevel(l) {
  if (l === state.level) {
    if (l === "advanced") {
      noteInteraction();
      triggerAdvancedCue();
    }
    return;
  }
  state.level = l;
  noteInteraction();
  resetSession(true);
  if (l === "advanced") triggerAdvancedCue();
}
function switchYogaSection(section) {
  if (!yogaSections[section] || section === state.yogaSection) return;
  state.yogaSection = section;
  if (state.track !== "yoga") state.track = "yoga";
  noteInteraction();
  resetSession(true);
}
function switchBreathOption(key) {
  if (!BREATH_OPTIONS[key] || key === state.breathOption) return;
  state.breathOption = key;
  if (state.track !== "breath") state.track = "breath";
  noteInteraction();
  resetSession(true);
}
function switchBreathMinutes(value) {
  const minutes = Math.max(2, Math.min(60, Math.round(Number(value) || 5)));
  if (minutes === state.breathMinutes && state.track === "breath") return;
  state.breathMinutes = minutes;
  if (state.track !== "breath") state.track = "breath";
  noteInteraction();
  resetSession(true);
}
function goNext() {
  if (state.stepIndex >= routine().length - 1) { stopTimer(); state.stepIndex = 0; state.remaining = routine()[0].duration; renderStep(false); showBurst("Session complete"); speak(cfg().voice.finish); return; }
  state.stepIndex++; state.remaining = routine()[state.stepIndex].duration; renderStep(true);
}
function tick() {
  const s = step();
  if (state.remaining <= 0) return;
  state.remaining--;
  const phaseInfo = updateTimer(s);
  updateProg();
  if (phaseInfo?.elapsedInPhase === 0 && state.remaining > 0 && state.remaining < s.duration) {
    showBurst(`${phaseInfo.label} ${phaseInfo.remaining}s`);
  }
  if (!s.breathPattern && state.remaining === Math.floor(s.duration / 2) && s.type === "movement") {
    const p = rndPrompt();
    showBurst(p);
    speak(p);
  }
  if (state.remaining === 5) {
    showBurst("5 seconds left");
    speak(cfg().voice.fiveSecond);
  }
  if (state.remaining === 0) {
    goNext();
  }
}
function startTimer() {
  if (state.running) return;
  noteInteraction();
  state.running = true;
  state.tickId = setInterval(tick, 1000);
  el.startBtn.textContent = "Running";
  showBurst(`Reverberesh — ${cfg().label}`);
  const mirrorCue = state.mirrorGuideEnabled ? " Mirror me by copying the side you see." : "";
  speak(`Hello, I'm Reverberesh. ${cfg().label}, ${state.level} pace.${mirrorCue} ${cfg().voice.intro}`);
}
function pauseTimer() { noteInteraction(); stopTimer(); showBurst("Paused"); speak(cfg().voice.pause); }
function jumpToStep(i) { noteInteraction(); state.stepIndex = i; state.remaining = routine()[i].duration; renderStep(true); }
function restartRoutine() { noteInteraction(); resetSession(true); showBurst("Restarted"); }
function toggleNeuralPose() {
  state.neuralPoseEnabled = !state.neuralPoseEnabled;
  if (el.animationStage) ensurePoseOverlay(el.animationStage);
  setPoseOverlayVisible(state.neuralPoseEnabled);
  updateSel();
  if (state.neuralPoseEnabled) {
    if (neuralPose.ready) {
      setPoseOverlayStatus("AI pose guide active", "live");
    } else if (neuralPose.failed) {
      setPoseOverlayStatus("AI pose guide offline", "offline");
    } else {
      setPoseOverlayStatus("AI pose guide loading", "loading");
      initNeuralPose();
    }
  }
}

function applyMirrorGuide() {
  document.body.dataset.mirrorGuide = state.mirrorGuideEnabled ? "on" : "off";
  if (el.animationStage) el.animationStage.dataset.mirrorGuide = state.mirrorGuideEnabled ? "on" : "off";
  if (!avatarGroup) return;
  avatarGroup.scale.x = state.mirrorGuideEnabled ? -1 : 1;
}

function toggleMirrorGuide() {
  noteInteraction();
  state.mirrorGuideEnabled = !state.mirrorGuideEnabled;
  applyMirrorGuide();
  updateSel();
  showBurst(state.mirrorGuideEnabled ? "Mirror guide on" : "Mirror guide off");
  speak(state.mirrorGuideEnabled ? "Mirror guide on. Copy the side you see." : "Mirror guide off.");
}

function toggleVoice() {
  noteInteraction();
  state.voiceEnabled = !state.voiceEnabled;
  updateSel();
  if (!state.voiceEnabled && "speechSynthesis" in window) {
    clearTimeout(speechTimer);
    window.speechSynthesis.cancel();
    return;
  }
  speak("Voice cues are on.");
}

function bindEvents() {
  el.trackExerciseBtn.addEventListener("click", () => switchTrack("exercise"));
  el.trackYogaBtn.addEventListener("click", () => switchTrack("yoga"));
  el.trackDanceBtn.addEventListener("click", () => switchTrack("dance"));
  el.trackBreathBtn.addEventListener("click", () => switchTrack("breath"));
  el.levelBeginnerBtn.addEventListener("click", () => switchLevel("beginner"));
  el.levelAdvancedBtn.addEventListener("click", () => switchLevel("advanced"));
  el.yogaSectionFlowBtn.addEventListener("click", () => switchYogaSection("flow"));
  el.yogaSectionRelaxBtn.addEventListener("click", () => switchYogaSection("relax"));
  el.breathOptionBtns.forEach(btn => btn.addEventListener("click", () => switchBreathOption(btn.dataset.breathOption)));
  el.breathDurationBtns.forEach(btn => btn.addEventListener("click", () => switchBreathMinutes(btn.dataset.breathMinutes)));
  el.breathCustomMinutes.addEventListener("change", () => switchBreathMinutes(el.breathCustomMinutes.value));
  el.startBtn.addEventListener("click", startTimer); el.pauseBtn.addEventListener("click", pauseTimer);
  el.nextBtn.addEventListener("click", () => { noteInteraction(); goNext(); });
  el.restartBtn.addEventListener("click", restartRoutine);
  el.voiceBtn.addEventListener("click", toggleVoice);
  el.neuralPoseBtn.addEventListener("click", toggleNeuralPose);
  el.mirrorGuideBtn.addEventListener("click", toggleMirrorGuide);
  el.cameraCoachBtn.addEventListener("click", startCameraCoach);
  el.cameraStopBtn.addEventListener("click", () => stopCameraCoach());
  el.exerciseStudioBtn.addEventListener("click", openExerciseStudio);
  el.exerciseStudioCloseBtn.addEventListener("click", closeExerciseStudio);
  el.exerciseForm.addEventListener("submit", saveCustomExercise);
  el.burstBtn.addEventListener("click", () => { noteInteraction(); const p = rndPrompt(); showBurst(p); speak(p); });
  window.addEventListener("pagehide", () => {
    cameraCoach.stream?.getTracks().forEach(track => track.stop());
  });
}

// ─── Init ───

async function init() {
  const p = new URLSearchParams(window.location.search);
  const pt = p.get("track"), pl = p.get("level"), section = p.get("section"), breathOption = p.get("timing") || p.get("breath") || p.get("pattern"), breathMinutes = parseInt(p.get("minutes") || p.get("duration") || "5", 10), mirror = p.get("mirror"), guide = p.get("guide"), ps = parseInt(p.get("step") || "0", 10);
  if (pt === "exercise" || pt === "yoga" || pt === "dance" || pt === "breath") state.track = pt;
  if (pl === "beginner" || pl === "advanced") state.level = pl;
  if (section === "flow" || section === "relax") state.yogaSection = section;
  if (BREATH_OPTIONS[breathOption]) state.breathOption = breathOption;
  if (Number.isFinite(breathMinutes)) state.breathMinutes = Math.max(2, Math.min(60, breathMinutes));
  if (mirror === "off" || mirror === "false" || mirror === "0") state.mirrorGuideEnabled = false;
  if (mirror === "on" || mirror === "true" || mirror === "1") state.mirrorGuideEnabled = true;
  if (guide === "off" || guide === "false" || guide === "0") state.neuralPoseEnabled = false;
  if (guide === "on" || guide === "true" || guide === "1") state.neuralPoseEnabled = true;
  state.customExercises = await window.ReverbereshStore?.listExercises?.() || [];
  state.routine = buildRoutine(state.track, state.level);
  state.stepIndex = Math.min(Math.max(0, Number.isFinite(ps) ? ps : 0), Math.max(0, state.routine.length - 1));
  state.remaining = routine()[state.stepIndex].duration;
  populateAnimationOptions(); renderCustomExerciseList(); renderSessionHistory();
  updateHero(); buildStepList(); el.totalTime.textContent = fmtDur(totalTime());
  bindEvents(); renderStep(false); setupScene();
}

init();
