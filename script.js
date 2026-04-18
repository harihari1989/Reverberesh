

/* ═══════════════════════════════════════════════════════════
   Interactive Workout + Yoga + Dance Guide
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
};

// ─── Routine builders ───

function move(o) { return { type: "movement", ...o }; }
function rest(duration, focus, summary, instructions, cues) {
  return { type: "rest", name: "Reset", duration, target: `${duration} sec reset`, animation: "rest", focus, summary, instructions, cues, period: 2.4 };
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

function buildYogaRoutine(level) {
  const adv = level === "advanced";
  return [
    move({ name: "Mountain Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "mountain", focus: "Root through the feet and stack the body", summary: "Stand grounded and long through the spine.", instructions: ["Press evenly through the feet.", "Soften the ribs and widen across the collarbones.", "Let the crown of the head rise over the center of the body."], cues: ["Root down and grow tall.", "Shoulders easy, ribs soft.", "Stand long through the whole body."], period: adv ? 2.7 : 2.8 }),
    move({ name: "Sun Reach Flow", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec flow`, animation: "sun", focus: "Length through the front body", summary: "Sweep the arms wide and overhead with the breath.", instructions: ["Inhale the arms up in a wide arc.", "Exhale and let them float back down.", "Keep the neck easy and the spine long."], cues: ["Move with the breath.", "Reach long without strain.", "Keep the neck soft."], period: adv ? 1.9 : 2 }),
    move({ name: "Chair Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "chair", focus: "Hip hinge and leg strength", summary: "Sit back as if reaching for a chair and keep the spine long.", instructions: ["Bend the knees and send the hips back.", "Reach the arms up without tightening the neck.", "Keep the weight balanced through the whole foot."], cues: ["Sit back gently.", "Knees follow the toes.", "Keep the spine long."], period: adv ? 1.8 : 1.9 }),
    move({ name: "Warrior II", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec hold`, animation: "warrior", focus: "Wide stance and front-knee alignment", summary: "Take a wide stance and reach calmly in both directions.", instructions: ["Open into a wide stance.", "Bend the front knee over the ankle.", "Reach through both arms while keeping the neck easy."], cues: ["Front knee stays over the ankle.", "Arms long, shoulders soft.", "Stay broad across the chest."], period: adv ? 1.7 : 1.8 }),
    rest(15, "Breathing reset", "Come back to center.", ["Bring the feet under the hips.", "Take a slow breath.", "Get ready to lengthen sideways."], ["Let the breath settle.", "Stand tall again.", "Move slowly."]),
    move({ name: "Standing Side Stretch", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec flow`, animation: "side-stretch", focus: "Length through the side ribs", summary: "Reach high before bending so the stretch comes from length.", instructions: ["Lift tall before you arc.", "Keep both feet grounded.", "Return through center slowly."], cues: ["Length first, then bend.", "Keep both feet heavy.", "Breathe into the side ribs."], period: adv ? 1.9 : 1.95 }),
    move({ name: "Tree Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "tree", focus: "Balance and a steady center", summary: "Balance calmly with the foot resting on the shin or thigh.", instructions: ["Press foot into leg and leg into foot.", "Skip the knee joint.", "Let the gaze settle on one point."], cues: ["Steady gaze, steady breath.", "Keep the standing leg strong.", "Grow tall through the center."], period: adv ? 2.4 : 2.5 }),
    move({ name: "Standing Forward Bend", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "fold", focus: "Hip hinge and back-body release", summary: "Fold by hinging at the hips, knees soft.", instructions: ["Stand with feet parallel, hinge forward.", "Bend knees as needed.", "Let the head release."], cues: ["Hinge at the hips.", "Soften the knees.", "Let the neck release."], period: adv ? 2.1 : 2.2 }),
    move({ name: "Seated Breath Reset", duration: adv ? 30 : 25, target: `${adv ? 30 : 25} sec hold`, animation: "seated", focus: "Seated upright cooldown", summary: "Sit tall in cross-legged shape, quiet breath.", instructions: ["Sit evenly through sitting bones.", "Rest hands on knees.", "Let breathing slow down."], cues: ["Sit tall without stiffness.", "Relax shoulders and jaw.", "Let the breath settle."], period: adv ? 2.8 : 2.9 }),
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
  if (t === "yoga") return buildYogaRoutine(l);
  if (t === "dance") return buildDanceRoutine(l);
  return buildExerciseRoutine(l);
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
    rootY: 0, rootX: 0,
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
  a: pose({}),
  b: pose({ rootY: 0.1, lArmZ: 12, rArmZ: 12 }),
};

P.sun = { speed: 0.6,
  a: pose({ lArmZ: 14, rArmZ: 14 }),
  b: pose({ rootY: 0.08, lArmX: 166, lArmZ: 20, lElbow: 8, rArmX: 166, rArmZ: 20, rElbow: 8, spineX: -4, headX: -6 }),
};

P.chair = { speed: 0.5,
  a: pose({ rootY: -1.7, spineX: 18,
    lLegX: 64, lKnee: 76, lLegZ: 5, lFootX: 12,
    rLegX: 64, rKnee: 76, rLegZ: 5, rFootX: 12,
    lArmX: 160, lArmZ: 16, lElbow: 8, rArmX: 160, rArmZ: 16, rElbow: 8 }),
  b: pose({ rootY: -2.15, spineX: 22, headX: 2,
    lLegX: 72, lKnee: 84, lLegZ: 5, lFootX: 16,
    rLegX: 72, rKnee: 84, rLegZ: 5, rFootX: 16,
    lArmX: 166, lArmZ: 16, lElbow: 6, rArmX: 166, rArmZ: 16, rElbow: 6 }),
};

P.warrior = { speed: 0.4,
  a: pose({ rootY: -1.05, spineX: 2, spineZ: -1, headY: 18,
    lLegX: 56, lKnee: 70, lLegZ: 0,
    rLegX: -16, rKnee: 6, rLegZ: 12,
    lArmX: 2, lArmZ: 84, lElbow: 6,
    rArmX: 2, rArmZ: 84, rElbow: 6 }),
  b: pose({ rootY: -1.2, spineX: 2, spineZ: 1, headY: 18,
    lLegX: 60, lKnee: 74, lLegZ: 0,
    rLegX: -16, rKnee: 6, rLegZ: 12,
    lArmX: 2, lArmZ: 86, lElbow: 4,
    rArmX: 2, rArmZ: 86, rElbow: 4 }),
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
    lArmX: 168, lArmZ: 12, lElbow: 18,
    rArmX: 168, rArmZ: 12, rElbow: 18,
    rLegX: 0, rKnee: 2,
    lLegX: 34, lLegZ: 34, lKnee: 96, lFootX: 26,
    spineZ: -1 }),
  b: pose({
    lArmX: 170, lArmZ: 13, lElbow: 16,
    rArmX: 170, rArmZ: 13, rElbow: 16,
    rLegX: 0, rKnee: 2,
    lLegX: 34, lLegZ: 34, lKnee: 96, lFootX: 26,
    spineZ: 1 }),
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

P.seated = { speed: 0.3,
  a: pose({ rootY: -6.5, spineX: 2,
    lLegX: 58, lLegZ: 38, lKnee: 115,
    rLegX: 58, rLegZ: 38, rKnee: 115,
    lArmX: 28, lElbow: 18, lArmZ: 8,
    rArmX: 28, rElbow: 18, rArmZ: 8 }),
  b: pose({ rootY: -6.5, spineX: 0,
    lLegX: 58, lLegZ: 38, lKnee: 115,
    rLegX: 58, rLegZ: 38, rKnee: 115,
    lArmX: 28, lElbow: 18, lArmZ: 8,
    rArmX: 28, rElbow: 18, rArmZ: 8 }),
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

let scene, camera, renderer3d, avatarGroup;
let bones = {};
const BODY = {
  headR: 0.82, neckL: 0.45, neckR: 0.28,
  torsoL: 3.0, torsoW: 1.05, torsoD: 0.6,
  shoulderW: 2.0, hipW: 1.2,
  uArmL: 2.3, uArmR: 0.28, lArmL: 2.0, lArmR: 0.22, handR: 0.22,
  uLegL: 3.1, uLegR: 0.4, lLegL: 2.9, lLegR: 0.3,
  footL: 1.1, footH: 0.22, footW: 0.38,
};

const MEDIAPIPE_WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MEDIAPIPE_POSE_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";
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
  if (neuralPose.canvas) neuralPose.canvas.hidden = !visible;
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
  if (typeof FilesetResolver === "undefined" || typeof PoseLandmarker === "undefined") {
    neuralPose.failed = true;
    setPoseOverlayStatus("AI pose guide unavailable", "offline");
    return;
  }

  neuralPose.loading = true;
  setPoseOverlayStatus("AI pose guide loading", "loading");
  try {
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

// Pose values use a symmetric convention: positive Z = abduction for BOTH sides.
// applyPose maps to actual Three.js rotations (mirrors right side, negates knees).
function applyPose(d) {
  const baseY = BODY.uLegL + BODY.lLegL + BODY.footH + 0.6;
  bones.root.position.y = baseY + d.rootY;
  bones.root.position.x = d.rootX;
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

function lerpPose(a, b, t) {
  const r = {};
  for (const key of Object.keys(a)) { r[key] = a[key] + (b[key] - a[key]) * t; }
  return r;
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

  // Enable shadows on avatar
  avatarGroup.traverse(child => {
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

    // Compute the current exercise's target pose (cycling A↔B)
    const pData = P[targetPoseAnim] || P.rest;
    const cycle = (Math.sin(time * pData.speed * Math.PI) + 1) / 2;
    const exercisePose = lerpPose(pData.a, pData.b, cycle);

    // Add subtle breathing overlay (always active)
    const breath = Math.sin(time * 1.2) * 0.08;
    exercisePose.rootY += breath;
    exercisePose.spineX += Math.sin(time * 1.2) * 0.5;

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

    // Camera: smooth orbit + per-pose angles + full body framing
    updateCamera(time, dt);

    renderer3d.render(scene, camera);
    updateNeuralPose(now);
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
  warrior:        { angle: 0,   height: 5.0, dist: 24, lookY: 4.5, orbit: 10 },   // wide, front, orbits
  "side-stretch": { angle: 0,   height: 6.0, dist: 22, lookY: 5.0, orbit: 0 },
  tree:           { angle: 10,  height: 5.5, dist: 22, lookY: 5.0, orbit: 14 },   // slow orbit for balance
  fold:           { angle: 75,  height: 3.5, dist: 19, lookY: 3.5, orbit: 0 },    // side view for hip hinge
  seated:         { angle: 5,   height: 2.5, dist: 17, lookY: 2.0, orbit: 10 },   // low, close
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

const state = { track: "exercise", level: "beginner", routine: [], stepIndex: 0, remaining: 0, running: false, tickId: null, cueId: null, cueIndex: 0, voiceEnabled: true, neuralPoseEnabled: false, hasUserInteracted: false };
state.routine = buildRoutine(state.track, state.level);

const $ = id => document.getElementById(id);
const el = {
  heroTitle: $("hero-title"), heroText: $("hero-text"), goalRow: $("goal-row"),
  sessionNote: $("session-note"), trackExerciseBtn: $("track-exercise-btn"),
  trackYogaBtn: $("track-yoga-btn"), trackDanceBtn: $("track-dance-btn"),
  levelBeginnerBtn: $("level-beginner-btn"),
  levelAdvancedBtn: $("level-advanced-btn"), timerRing: $("timer-ring"),
  remainingTime: $("remaining-time"), stepCount: $("step-count"),
  stepType: $("step-type"), stepTarget: $("step-target"),
  startBtn: $("start-btn"), pauseBtn: $("pause-btn"),
  nextBtn: $("next-btn"), restartBtn: $("restart-btn"),
  voiceBtn: $("voice-btn"), neuralPoseBtn: $("neural-pose-btn"), burstBtn: $("burst-btn"),
  currentName: $("current-name"), currentFocus: $("current-focus"),
  currentSummary: $("current-summary"), coachCue: $("coach-cue"),
  instructionList: $("instruction-list"), upNext: $("up-next"),
  sessionProgressFill: $("session-progress-fill"),
  sessionProgressCopy: $("session-progress-copy"),
  interactiveTip: $("interactive-tip"), totalTime: $("total-time"),
  stepList: $("step-list"), noteList: $("note-list"),
  motivationBurst: $("motivation-burst"), animationStage: $("animation-stage"),
};
el.voiceBtnLabel = el.voiceBtn ? el.voiceBtn.querySelector("[data-label]") : null;
el.neuralPoseBtnLabel = el.neuralPoseBtn ? el.neuralPoseBtn.querySelector("[data-neural-label]") : null;

function cfg() { return tracks[state.track]; }
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

function updateHero() {
  const t = cfg(); document.body.dataset.track = state.track;
  el.heroTitle.textContent = t.heroTitle; el.heroText.textContent = t.heroText;
  el.sessionNote.textContent = t.descriptions[state.level]; el.interactiveTip.textContent = t.tip;
  el.burstBtn.textContent = t.burstLabel;
  el.goalRow.innerHTML = ""; t.goals.forEach(g => { const s = document.createElement("span"); s.className = "goal-pill"; s.textContent = g; el.goalRow.appendChild(s); });
  el.noteList.innerHTML = ""; t.notes.forEach(n => { const li = document.createElement("li"); li.textContent = n; el.noteList.appendChild(li); });

  // Update avatar shirt color based on track
  if (avatarGroup) {
    const shirtColors = { exercise: 0x2563eb, yoga: 0x059669, dance: 0xf97316 };
    const shirtColor = shirtColors[state.track] || shirtColors.exercise;
    avatarGroup.traverse(child => {
      if (child.isMesh && child.material && child.material.color) {
        const hex = child.material.color.getHex();
        if (hex === 0x2563eb || hex === 0x059669 || hex === 0xf97316) child.material.color.setHex(shirtColor);
      }
    });
  }
}

function updateSel() {
  el.trackExerciseBtn.classList.toggle("is-active", state.track === "exercise");
  el.trackYogaBtn.classList.toggle("is-active", state.track === "yoga");
  el.trackDanceBtn.classList.toggle("is-active", state.track === "dance");
  el.levelBeginnerBtn.classList.toggle("is-active", state.level === "beginner");
  el.levelAdvancedBtn.classList.toggle("is-active", state.level === "advanced");
  el.voiceBtn.classList.toggle("is-active", state.voiceEnabled);
  el.neuralPoseBtn.classList.toggle("is-active", state.neuralPoseEnabled);
  if (el.voiceBtnLabel) el.voiceBtnLabel.textContent = state.voiceEnabled ? "Voice cues on" : "Voice cues off";
  if (el.neuralPoseBtnLabel) el.neuralPoseBtnLabel.textContent = state.neuralPoseEnabled ? "Hide neural pose" : "Show neural pose";
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
function updateTimer(s) { el.remainingTime.textContent = String(state.remaining); el.stepCount.textContent = `Step ${state.stepIndex + 1} of ${routine().length}`; el.stepType.textContent = s.type === "rest" ? "Reset" : cfg().label; el.stepTarget.textContent = s.target; el.timerRing.style.setProperty("--ring-progress", String((state.remaining / s.duration) * 100)); }
function fmtPreview(s) { return s.type === "rest" ? `Reset for ${s.duration} seconds.` : `${s.name} for ${s.target}.`; }
function schedCue(s) { clearInterval(state.cueId); state.cueIndex = 0; el.coachCue.textContent = s.cues[0]; state.cueId = setInterval(() => { state.cueIndex = (state.cueIndex + 1) % s.cues.length; el.coachCue.textContent = s.cues[state.cueIndex]; }, 4500); }

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
function switchTrack(t) { if (t === state.track) return; state.track = t; noteInteraction(); resetSession(true); }
function switchLevel(l) { if (l === state.level) return; state.level = l; noteInteraction(); resetSession(true); }
function goNext() {
  if (state.stepIndex >= routine().length - 1) { stopTimer(); state.stepIndex = 0; state.remaining = routine()[0].duration; renderStep(false); showBurst("Session complete"); speak(cfg().voice.finish); return; }
  state.stepIndex++; state.remaining = routine()[state.stepIndex].duration; renderStep(true);
}
function tick() {
  const s = step();
  if (state.remaining <= 0) return;
  state.remaining--;
  updateTimer(s);
  updateProg();
  if (state.remaining === Math.floor(s.duration / 2) && s.type === "movement") {
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
  speak(`Hello, I'm Reverberesh. ${cfg().label}, ${state.level} pace. ${cfg().voice.intro}`);
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
  el.levelBeginnerBtn.addEventListener("click", () => switchLevel("beginner"));
  el.levelAdvancedBtn.addEventListener("click", () => switchLevel("advanced"));
  el.startBtn.addEventListener("click", startTimer); el.pauseBtn.addEventListener("click", pauseTimer);
  el.nextBtn.addEventListener("click", () => { noteInteraction(); goNext(); });
  el.restartBtn.addEventListener("click", restartRoutine);
  el.voiceBtn.addEventListener("click", toggleVoice);
  el.neuralPoseBtn.addEventListener("click", toggleNeuralPose);
  el.burstBtn.addEventListener("click", () => { noteInteraction(); const p = rndPrompt(); showBurst(p); speak(p); });
}

// ─── Init ───

function init() {
  const p = new URLSearchParams(window.location.search);
  const pt = p.get("track"), pl = p.get("level"), ps = parseInt(p.get("step") || "0", 10);
  if (pt === "exercise" || pt === "yoga" || pt === "dance") state.track = pt;
  if (pl === "beginner" || pl === "advanced") state.level = pl;
  state.routine = buildRoutine(state.track, state.level);
  state.stepIndex = Math.min(Math.max(0, Number.isFinite(ps) ? ps : 0), Math.max(0, state.routine.length - 1));
  state.remaining = routine()[state.stepIndex].duration;
  updateHero(); buildStepList(); el.totalTime.textContent = fmtDur(totalTime());
  bindEvents(); setupScene(); renderStep(false);
}

init();
