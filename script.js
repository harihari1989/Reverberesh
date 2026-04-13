

/* ═══════════════════════════════════════════════════════════
   Interactive Exercise + Yoga Guide
   3D Humanoid Avatar (Three.js) with skeletal pose animation
   ═══════════════════════════════════════════════════════════ */

const DEG = Math.PI / 180;

// ─── Track definitions ───

const tracks = {
  exercise: {
    label: "Exercise", heroTitle: "Train with Reverberesh",
    heroText: "Hi, I'm Reverberesh — your friendly AI fitness coach! Follow along with my 3D avatar as I guide you through each movement with warm encouragement and clear form cues.",
    goals: ["Full Body", "Better Form", "Energy Boost"],
    descriptions: { beginner: "Beginner exercise uses simpler pacing and more recovery so the movement quality stays clean.", advanced: "Advanced exercise uses longer work blocks and stronger pacing while keeping posture in control." },
    tip: "Click any step to jump there, or use Cheer Me for an instant coaching boost.",
    burstLabel: "Cheer Me",
    notes: ["Keep your ribs stacked over the hips whenever you reset.", "On squats, send the hips back first and keep the knees tracking over the feet.", "On trunk rotation, move the head, chest, and torso together without leaning.", "If the form starts to drift, shorten the range and regain posture before continuing."],
    prompts: ["You're doing great! Keep that form sharp.", "Quality over speed — you've got this!", "Wonderful work! Chest lifted, shoulders relaxed.", "Love that rhythm! Stay tall and finish strong."],
  },
  yoga: {
    label: "Yoga", heroTitle: "Flow with Reverberesh",
    heroText: "Welcome — I'm Reverberesh, your calm and patient yoga guide. Let me walk you through each pose with gentle cues, smooth transitions, and a pace that honours your body.",
    goals: ["Balance", "Mobility", "Calm Energy"],
    descriptions: { beginner: "Beginner yoga keeps the holds shorter and the transitions slower so you can find the shape first.", advanced: "Advanced yoga adds longer holds and steadier control while keeping the alignment calm and clear." },
    tip: "Use Center Me anytime for a fresh grounding cue, then settle back into the breath.",
    burstLabel: "Center Me",
    notes: ["Root evenly through the feet before trying to deepen any standing pose.", "In Chair and Forward Fold, hinge from the hips instead of collapsing the spine.", "In Warrior II, keep the front knee stacked over the ankle rather than forcing depth.", "In Tree, place the foot on the shin or thigh and avoid pressing into the knee."],
    prompts: ["Beautiful — steady breath, steady shape.", "Softly now. Long through the spine, easy in the shoulders.", "That's lovely control. Let your breath lead.", "Feel those roots through your feet. You're doing beautifully."],
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
    move({ name: "March + Reach", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec pace`, animation: "march", focus: "Warm the whole body and lift posture", summary: "March with light feet and a strong overhead reach.", instructions: ["Stand tall and lift the opposite arm as each knee rises.", "Land softly and keep the chest open.", "Move at a pace you can keep smooth and easy."], cues: ["Stay tall through the spine.", "Reach up without shrugging.", "Soft feet, easy breath."], period: adv ? 0.95 : 1.05 }),
    move({ name: "Side Step Pull", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec pace`, animation: "side-step", focus: "Lateral movement and upper-back activation", summary: "Step side to side and pull the elbows back to open the chest.", instructions: ["Step wide to one side and draw both elbows back.", "Return through center and repeat.", "Keep the shoulders down and the chest broad."], cues: ["Pull from the upper back.", "Move smoothly side to side.", "Keep the chest proud."], period: adv ? 1.05 : 1.12 }),
    move({ name: "Bodyweight Squat", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec pace`, animation: "squat", focus: "Leg drive and upright squat mechanics", summary: "Shift the hips back first, squat with the chest lifted, and stand tall.", instructions: ["Set the feet slightly wider than hip-width.", "Brace the core and send the hips back.", "Push through the heels to stand tall."], cues: ["Hips back first.", "Knees track with the feet.", "Chest up and spine long."], period: adv ? 1.2 : 1.28 }),
    rest(adv ? 12 : 15, "Breathing reset", "Slow the breath and prepare for rotation.", ["Take one full exhale and let the shoulders soften.", "Stand tall with the core lightly braced.", "Prepare to rotate without leaning."], ["Recover without slumping.", "Relax the jaw.", "Reset and get ready."]),
    move({ name: "Standing Trunk Rotation", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec pace`, animation: "rotation", focus: "Core control and upright rotation", summary: "Rotate through the torso while staying vertical.", instructions: ["Hold the hands near chest height.", "Rotate head, chest, and torso together.", "Avoid leaning into the turn."], cues: ["Torso stays vertical.", "Move as one unit.", "Shoulders down and back."], period: adv ? 1.05 : 1.12 }),
    move({ name: "Boxer Punches", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec pace`, animation: "punch", focus: "Cardio rhythm and upper-body drive", summary: "Bounce lightly and alternate strong punches.", instructions: ["Use a soft athletic stance.", "Punch forward sharply.", "Keep the shoulders loose."], cues: ["Quick hands, easy shoulders.", "Stay light through the feet.", "Keep the chest lifted."], period: adv ? 0.82 : 0.9 }),
    rest(adv ? 12 : 15, "Quick recovery", "Ease the breathing down.", ["Release the hands and breathe deeper.", "Reset the shoulders.", "Stand ready for the finish."], ["Catch the breath.", "Stand tall again.", "Finish strong."]),
    move({ name: "Posture Pull-Opens", duration: adv ? 35 : 30, target: `${adv ? 35 : 30} sec pace`, animation: "posture", focus: "Open chest and upper-back activation", summary: "Sweep the arms wide and back, pause in the open-chest position.", instructions: ["Reach forward, then pull the arms open and back.", "Pause while the shoulder blades squeeze.", "Keep the neck relaxed."], cues: ["Open wide through the collarbones.", "Squeeze between the shoulder blades.", "Finish every rep tall."], period: adv ? 1.25 : 1.3 }),
  ];
}

function buildYogaRoutine(level) {
  const adv = level === "advanced";
  return [
    move({ name: "Mountain Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "mountain", focus: "Root through the feet and stack the body", summary: "Stand grounded and long through the spine.", instructions: ["Press evenly through the feet.", "Draw the shoulders back.", "Crown of head stacked over pelvis."], cues: ["Root down and rise up.", "Shoulders broad, ribs soft.", "Crown stacked over pelvis."], period: adv ? 2.7 : 2.8 }),
    move({ name: "Sun Reach Flow", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec flow`, animation: "sun", focus: "Length through the front body", summary: "Sweep the arms wide and overhead with the breath.", instructions: ["Inhale the arms up in a wide arc.", "Exhale and lower them.", "Keep the neck easy and spine long."], cues: ["Move with the breath.", "Reach long.", "Keep the neck soft."], period: adv ? 1.9 : 2 }),
    move({ name: "Chair Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "chair", focus: "Hip hinge and leg strength", summary: "Sit back into an imaginary chair, keep lower back long.", instructions: ["Bend the knees and tip slightly forward.", "Keep inner thighs parallel.", "Tailbone draws down."], cues: ["Sit back through the hips.", "Knees track over feet.", "Lower back stays long."], period: adv ? 1.8 : 1.9 }),
    move({ name: "Warrior II", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec hold`, animation: "warrior", focus: "Wide stance and front-knee alignment", summary: "Strong wide stance, reach in both directions.", instructions: ["Open into a wide stance.", "Bend front knee over ankle.", "Shoulder blades draw down."], cues: ["Front knee stays over ankle.", "Arms long, shoulders easy.", "Stay broad across the chest."], period: adv ? 1.7 : 1.8 }),
    rest(15, "Breathing reset", "Come back to center.", ["Bring the feet under the hips.", "Take a slow breath.", "Get ready to lengthen sideways."], ["Let the breath settle.", "Stand tall again.", "Move slowly."]),
    move({ name: "Standing Side Stretch", duration: adv ? 40 : 30, target: `${adv ? 40 : 30} sec flow`, animation: "side-stretch", focus: "Length through the side ribs", summary: "Reach high before bending so the stretch comes from length.", instructions: ["Lift tall before you arc.", "Keep both feet grounded.", "Return through center."], cues: ["Length first, then bend.", "Keep both feet heavy.", "Breathe into the side ribs."], period: adv ? 1.9 : 1.95 }),
    move({ name: "Tree Pose", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "tree", focus: "Balance and level pelvis", summary: "Balance calmly with foot on shin or thigh.", instructions: ["Press foot into leg and leg into foot.", "Avoid placing foot on knee.", "Steady gaze point."], cues: ["Steady gaze, steady breath.", "Avoid the knee.", "Grow tall from center."], period: adv ? 2.4 : 2.5 }),
    move({ name: "Standing Forward Bend", duration: adv ? 35 : 25, target: `${adv ? 35 : 25} sec hold`, animation: "fold", focus: "Hip hinge and back-body release", summary: "Fold by hinging at the hips, knees soft.", instructions: ["Stand with feet parallel, hinge forward.", "Bend knees as needed.", "Let the head release."], cues: ["Hinge at the hips.", "Soften the knees.", "Let the neck release."], period: adv ? 2.1 : 2.2 }),
    move({ name: "Seated Breath Reset", duration: adv ? 30 : 25, target: `${adv ? 30 : 25} sec hold`, animation: "seated", focus: "Seated upright cooldown", summary: "Sit tall in cross-legged shape, quiet breath.", instructions: ["Sit evenly through sitting bones.", "Rest hands on knees.", "Let breathing slow down."], cues: ["Sit tall without stiffness.", "Relax shoulders and jaw.", "Let the breath settle."], period: adv ? 2.8 : 2.9 }),
  ];
}

function buildRoutine(t, l) { return t === "yoga" ? buildYogaRoutine(l) : buildExerciseRoutine(l); }

// ═══════════════════════════════════════════════════════════
//  3D POSE KEYFRAMES — Anatomically correct
//  Convention (all values in degrees):
//    ArmX  +  = shoulder flexion (arm forward)    -  = extension (arm back)
//    ArmZ  +  = abduction (arm away from body)    for BOTH sides
//    Elbow +  = flexion (forearm toward shoulder)  ALWAYS ≥ 0
//    LegX  +  = hip flexion (thigh forward/up)    -  = extension (thigh back)
//    LegZ  +  = abduction (leg away from body)    for BOTH sides
//    Knee  +  = flexion (shin bends back)          ALWAYS ≥ 0
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
  },
};

function pose(ov) { return { ...P._base, ...ov }; }

// ── Exercise ──

P.march = { speed: 2.0,
  a: pose({ rootY: 0.15,
    lLegX: 68, lKnee: 80,           // left thigh up, shin hangs
    rLegX: -10, rKnee: 8,           // right leg planted, slight behind
    rArmX: 55, rElbow: 40, rArmZ: 8, // right arm swings forward
    lArmX: -25, lElbow: 20, lArmZ: 8, // left arm swings back
    spineX: 3 }),
  b: pose({ rootY: 0.15,
    rLegX: 68, rKnee: 80,
    lLegX: -10, lKnee: 8,
    lArmX: 55, lElbow: 40, lArmZ: 8,
    rArmX: -25, rElbow: 20, rArmZ: 8,
    spineX: 3 }),
};

P["side-step"] = { speed: 1.4,
  a: pose({ rootX: -0.6, spineZ: -3,
    lArmX: 25, lArmZ: 18, lElbow: 70,  // elbows pull back
    rArmX: 25, rArmZ: 18, rElbow: 70,
    lLegZ: 8, rLegZ: 0, lKnee: 12, rKnee: 12 }),
  b: pose({ rootX: 0.6, spineZ: 3,
    lArmX: 25, lArmZ: 18, lElbow: 70,
    rArmX: 25, rArmZ: 18, rElbow: 70,
    rLegZ: 8, lLegZ: 0, lKnee: 12, rKnee: 12 }),
};

P.squat = { speed: 1.0,
  a: pose({ spineX: 5,
    lArmX: 40, lArmZ: 22, lElbow: 12,
    rArmX: 40, rArmZ: 22, rElbow: 12 }),
  b: pose({ rootY: -2.8, spineX: 25,
    lLegX: 88, lKnee: 105, lLegZ: 6,
    rLegX: 88, rKnee: 105, rLegZ: 6,
    lArmX: 70, lArmZ: 28, lElbow: 10,
    rArmX: 70, rArmZ: 28, rElbow: 10 }),
};

P.rotation = { speed: 1.4,
  a: pose({ spineY: 35, headY: 15,
    lArmX: 45, lElbow: 90, lArmZ: 5,
    rArmX: 45, rElbow: 90, rArmZ: 5 }),
  b: pose({ spineY: -35, headY: -15,
    lArmX: 45, lElbow: 90, lArmZ: 5,
    rArmX: 45, rElbow: 90, rArmZ: 5 }),
};

P.punch = { speed: 2.6,
  a: pose({ rootY: -0.3, spineY: -12,
    lArmX: 85, lArmZ: 5, lElbow: 8,    // left jab extended
    rArmX: 40, rArmZ: 10, rElbow: 110,  // right guard
    lLegX: 5, lKnee: 18, rLegX: -5, rKnee: 18 }),
  b: pose({ rootY: -0.3, spineY: 12,
    rArmX: 85, rArmZ: 5, rElbow: 8,
    lArmX: 40, lArmZ: 10, lElbow: 110,
    rLegX: 5, rKnee: 18, lLegX: -5, lKnee: 18 }),
};

P.posture = { speed: 0.9,
  a: pose({ lArmX: 70, lArmZ: 10, lElbow: 25, rArmX: 70, rArmZ: 10, rElbow: 25, spineX: 4 }),
  b: pose({ lArmX: 8, lArmZ: 72, lElbow: 10, rArmX: 8, rArmZ: 72, rElbow: 10, spineX: -4 }),
};

// ── Yoga ──

P.mountain = { speed: 0.45,
  a: pose({}),
  b: pose({ rootY: 0.12, lArmZ: 12, rArmZ: 12 }),
};

P.sun = { speed: 0.6,
  a: pose({ lArmZ: 14, rArmZ: 14 }),
  b: pose({ lArmX: 170, lArmZ: 22, lElbow: 5, rArmX: 170, rArmZ: 22, rElbow: 5, spineX: -6, headX: -8 }),
};

P.chair = { speed: 0.5,
  a: pose({ rootY: -1.8, spineX: 20,
    lLegX: 68, lKnee: 78, lLegZ: 4, rLegX: 68, rKnee: 78, rLegZ: 4,
    lArmX: 165, lArmZ: 14, lElbow: 5, rArmX: 165, rArmZ: 14, rElbow: 5 }),
  b: pose({ rootY: -2.2, spineX: 23,
    lLegX: 75, lKnee: 85, lLegZ: 4, rLegX: 75, rKnee: 85, rLegZ: 4,
    lArmX: 168, lArmZ: 15, lElbow: 3, rArmX: 168, rArmZ: 15, rElbow: 3 }),
};

P.warrior = { speed: 0.4,
  a: pose({ rootY: -1.1,
    lLegX: 58, lKnee: 72, lLegZ: 0,      // front leg deep bend
    rLegX: -18, rKnee: 5, rLegZ: 10,      // back leg straight, angled out
    lArmX: 2, lArmZ: 85, lElbow: 5,       // arms horizontal
    rArmX: 2, rArmZ: 85, rElbow: 5,
    spineX: 2, headY: 18 }),
  b: pose({ rootY: -1.3,
    lLegX: 62, lKnee: 76, lLegZ: 0,
    rLegX: -18, rKnee: 5, rLegZ: 10,
    lArmX: 2, lArmZ: 87, lElbow: 3,
    rArmX: 2, rArmZ: 87, rElbow: 3,
    spineX: 2, headY: 18 }),
};

P["side-stretch"] = { speed: 0.6,
  a: pose({ spineZ: 22,
    lArmX: 160, lArmZ: 14, lElbow: 5,
    rArmX: 5, rArmZ: 8, rElbow: 18, lLegZ: 4, rLegZ: 4 }),
  b: pose({ spineZ: -22,
    rArmX: 160, rArmZ: 14, rElbow: 5,
    lArmX: 5, lArmZ: 8, lElbow: 18, lLegZ: 4, rLegZ: 4 }),
};

P.tree = { speed: 0.3,
  a: pose({
    lArmX: 170, lArmZ: 12, lElbow: 18,    // arms overhead palms together
    rArmX: 170, rArmZ: 12, rElbow: 18,
    rLegX: 0, rKnee: 2,                     // standing leg
    lLegX: 38, lLegZ: 35, lKnee: 100,       // lifted leg out to side
    spineZ: -1 }),
  b: pose({
    lArmX: 172, lArmZ: 13, lElbow: 16,
    rArmX: 172, rArmZ: 13, rElbow: 16,
    rLegX: 0, rKnee: 2,
    lLegX: 38, lLegZ: 35, lKnee: 100,
    spineZ: 1 }),
};

P.fold = { speed: 0.4,
  a: pose({ spineX: 75, headX: 10,
    lArmX: -15, lArmZ: 8, lElbow: 18,
    rArmX: -15, rArmZ: 8, rElbow: 18,
    lLegX: 5, lKnee: 14, rLegX: 5, rKnee: 14 }),
  b: pose({ spineX: 88, headX: 14,
    lArmX: -10, lArmZ: 6, lElbow: 12,
    rArmX: -10, rArmZ: 6, rElbow: 12,
    lLegX: 5, lKnee: 18, rLegX: 5, rKnee: 18 }),
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
  b: pose({ rootY: 0.1, lArmZ: 12, rArmZ: 12 }),
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

    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(BODY.footW, BODY.footH, BODY.footL),
      shoeM
    );
    foot.position.set(0, -BODY.footH / 2, BODY.footL * 0.2);
    footG.add(foot);

    return { legG, kneeG };
  }

  const ll = buildLeg("left");
  bones.lLeg = ll.legG; bones.lKnee = ll.kneeG;
  const rl = buildLeg("right");
  bones.rLeg = rl.legG; bones.rKnee = rl.kneeG;

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

let selectedVoiceEx = null, selectedVoiceYo = null;
const PREF_EX = ["Samantha", "Karen", "Moira", "Tessa", "Google UK English Female", "Google US English", "Microsoft Zira"];
const PREF_YO = ["Samantha", "Karen", "Moira", "Google UK English Female", "Microsoft Zira"];

function pickVoice(pref, voices) {
  for (const n of pref) { const m = voices.find(v => v.name.includes(n)); if (m) return m; }
  const en = voices.filter(v => v.lang && v.lang.startsWith("en"));
  return en.find(v => /female|samantha|karen|zira|jenny/i.test(v.name)) || en[0] || voices[0] || null;
}
function loadVoices() { const v = window.speechSynthesis?.getVoices() || []; if (v.length) { selectedVoiceEx = pickVoice(PREF_EX, v); selectedVoiceYo = pickVoice(PREF_YO, v); } }
if ("speechSynthesis" in window) { loadVoices(); window.speechSynthesis.addEventListener("voiceschanged", loadVoices); }

function speak(text) {
  if (!state.voiceEnabled || !state.hasUserInteracted || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  loadVoices();
  const v = state.track === "yoga" ? selectedVoiceYo : selectedVoiceEx;
  if (v) u.voice = v;
  if (state.track === "yoga") { u.rate = 0.88; u.pitch = 1.0; u.volume = 0.9; }
  else { u.rate = 1.0; u.pitch = 1.05; u.volume = 1; }
  window.speechSynthesis.speak(u);
}

// ═══════════════════════════════════════════════════════════
//  APP STATE + UI
// ═══════════════════════════════════════════════════════════

const state = { track: "exercise", level: "beginner", routine: [], stepIndex: 0, remaining: 0, running: false, tickId: null, cueId: null, cueIndex: 0, voiceEnabled: true, hasUserInteracted: false };
state.routine = buildRoutine(state.track, state.level);

const $ = id => document.getElementById(id);
const el = {
  heroTitle: $("hero-title"), heroText: $("hero-text"), goalRow: $("goal-row"),
  sessionNote: $("session-note"), trackExerciseBtn: $("track-exercise-btn"),
  trackYogaBtn: $("track-yoga-btn"), levelBeginnerBtn: $("level-beginner-btn"),
  levelAdvancedBtn: $("level-advanced-btn"), timerRing: $("timer-ring"),
  remainingTime: $("remaining-time"), stepCount: $("step-count"),
  stepType: $("step-type"), stepTarget: $("step-target"),
  startBtn: $("start-btn"), pauseBtn: $("pause-btn"),
  nextBtn: $("next-btn"), restartBtn: $("restart-btn"),
  voiceBtn: $("voice-btn"), burstBtn: $("burst-btn"),
  currentName: $("current-name"), currentFocus: $("current-focus"),
  currentSummary: $("current-summary"), coachCue: $("coach-cue"),
  instructionList: $("instruction-list"), upNext: $("up-next"),
  sessionProgressFill: $("session-progress-fill"),
  sessionProgressCopy: $("session-progress-copy"),
  interactiveTip: $("interactive-tip"), totalTime: $("total-time"),
  stepList: $("step-list"), noteList: $("note-list"),
  motivationBurst: $("motivation-burst"), animationStage: $("animation-stage"),
};

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
    const shirtColor = state.track === "yoga" ? 0x059669 : 0x2563eb;
    avatarGroup.traverse(child => {
      if (child.isMesh && child.material && child.material.color) {
        const hex = child.material.color.getHex();
        if (hex === 0x2563eb || hex === 0x059669) child.material.color.setHex(shirtColor);
      }
    });
  }
}

function updateSel() {
  el.trackExerciseBtn.classList.toggle("is-active", state.track === "exercise");
  el.trackYogaBtn.classList.toggle("is-active", state.track === "yoga");
  el.levelBeginnerBtn.classList.toggle("is-active", state.level === "beginner");
  el.levelAdvancedBtn.classList.toggle("is-active", state.level === "advanced");
  el.voiceBtn.classList.toggle("is-active", state.voiceEnabled);
  el.voiceBtn.textContent = state.voiceEnabled ? "Voice cues on" : "Voice cues off";
}

function buildStepList() {
  el.stepList.innerHTML = "";
  routine().forEach((s, i) => {
    const c = document.createElement("article"); c.className = "step-card"; c.dataset.index = String(i);
    const title = s.type === "rest" ? "Reset / Rest" : s.name;
    const meta = s.type === "rest" ? s.focus : `${s.target} · ${s.focus}`;
    c.innerHTML = `<div class="step-index">${i + 1}</div><div class="step-copy"><p class="step-title">${title}</p><p class="step-meta">${meta}</p></div><div class="step-duration">${s.duration}s</div>`;
    c.addEventListener("click", () => { state.hasUserInteracted = true; jumpToStep(i); });
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
  el.upNext.textContent = next ? fmtPreview(next) : "Final block. Finish tall.";
  updateSel(); updateInstr(s); updateStepCards(); updateProg(); updateTimer(s); schedCue(s);
  transitionToAnimation(s.animation);
  showBurst(s.type === "rest" ? "Catch the breath" : s.name);
  if (!announce) return;
  speak(s.type === "rest" ? `Reset. ${s.instructions[0]} ${rndPrompt()}` : `${s.name}. ${s.instructions[0]} ${rndPrompt()}`);
}

function stopTimer() { state.running = false; clearInterval(state.tickId); state.tickId = null; el.startBtn.textContent = "Start"; }
function resetSession(announce = true) { stopTimer(); state.routine = buildRoutine(state.track, state.level); state.stepIndex = 0; state.remaining = routine()[0].duration; updateHero(); buildStepList(); el.totalTime.textContent = fmtDur(totalTime()); renderStep(announce); }
function switchTrack(t) { if (t === state.track) return; state.track = t; state.hasUserInteracted = true; resetSession(true); }
function switchLevel(l) { if (l === state.level) return; state.level = l; state.hasUserInteracted = true; resetSession(true); }
function goNext() {
  if (state.stepIndex >= routine().length - 1) { stopTimer(); state.stepIndex = 0; state.remaining = routine()[0].duration; renderStep(false); showBurst("Session complete"); speak(state.track === "yoga" ? "Session complete. Calm work." : "Session complete. Strong finish."); return; }
  state.stepIndex++; state.remaining = routine()[state.stepIndex].duration; renderStep(true);
}
function tick() { const s = step(); if (state.remaining <= 0) return; state.remaining--; updateTimer(s); updateProg(); if (state.remaining === Math.floor(s.duration / 2) && s.type === "movement") { const p = rndPrompt(); showBurst(p); speak(p); } if (state.remaining === 5) { showBurst("5 seconds left"); speak(state.track === "yoga" ? "Five seconds. Stay steady." : "Five seconds. Finish strong."); } if (state.remaining === 0) { showBurst("Switch"); speak("Switch."); goNext(); } }
function startTimer() { if (state.running) return; state.hasUserInteracted = true; state.running = true; state.tickId = setInterval(tick, 1000); el.startBtn.textContent = "Running"; showBurst(`Reverberesh — ${cfg().label}`); speak(`Hi, I'm Reverberesh! ${cfg().label}, ${state.level} mode. ${state.track === "yoga" ? "Take a breath, settle in, and let's flow together." : "Let's bring that energy up! I'm right here with you."}`); }
function pauseTimer() { state.hasUserInteracted = true; stopTimer(); showBurst("Paused"); speak(state.track === "yoga" ? "Take your time. I'll be right here when you're ready." : "Nice pause. Catch your breath — we'll pick right back up."); }
function jumpToStep(i) { state.stepIndex = i; state.remaining = routine()[i].duration; renderStep(true); }
function restartRoutine() { state.hasUserInteracted = true; resetSession(true); showBurst("Restarted"); }
function toggleVoice() { state.hasUserInteracted = true; state.voiceEnabled = !state.voiceEnabled; updateSel(); if (!state.voiceEnabled && "speechSynthesis" in window) { window.speechSynthesis.cancel(); return; } speak("Voice cues enabled."); }

function bindEvents() {
  el.trackExerciseBtn.addEventListener("click", () => switchTrack("exercise"));
  el.trackYogaBtn.addEventListener("click", () => switchTrack("yoga"));
  el.levelBeginnerBtn.addEventListener("click", () => switchLevel("beginner"));
  el.levelAdvancedBtn.addEventListener("click", () => switchLevel("advanced"));
  el.startBtn.addEventListener("click", startTimer); el.pauseBtn.addEventListener("click", pauseTimer);
  el.nextBtn.addEventListener("click", () => { state.hasUserInteracted = true; goNext(); });
  el.restartBtn.addEventListener("click", restartRoutine);
  el.voiceBtn.addEventListener("click", toggleVoice);
  el.burstBtn.addEventListener("click", () => { state.hasUserInteracted = true; const p = rndPrompt(); showBurst(p); speak(p); });
}

// ─── Init ───

function init() {
  const p = new URLSearchParams(window.location.search);
  const pt = p.get("track"), pl = p.get("level"), ps = parseInt(p.get("step") || "0", 10);
  if (pt === "exercise" || pt === "yoga") state.track = pt;
  if (pl === "beginner" || pl === "advanced") state.level = pl;
  state.routine = buildRoutine(state.track, state.level);
  state.stepIndex = Math.min(Math.max(0, Number.isFinite(ps) ? ps : 0), Math.max(0, state.routine.length - 1));
  state.remaining = routine()[state.stepIndex].duration;
  updateHero(); buildStepList(); el.totalTime.textContent = fmtDur(totalTime());
  bindEvents(); setupScene(); renderStep(false);
}

init();

