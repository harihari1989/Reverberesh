# Pose Reference Images

Drop AI-generated human pose images into this folder so the app can use real pose photos instead of the canvas guide when assets exist.

## Folder layout

Create:

- `assets/pose-reference/exercise/`
- `assets/pose-reference/yoga/`
- `assets/pose-reference/yoga/relaxation/`
- `assets/pose-reference/breath/`

Supported file extensions:

- `.png`
- `.webp`
- `.jpg`
- `.jpeg`

## Expected filenames

### Exercise

- `march-reach`
- `side-step-pull`
- `bodyweight-squat`
- `standing-trunk-rotation`
- `boxer-punches`
- `posture-pull-opens`

### Yoga

- `mountain-pose`
- `sun-reach-flow`
- `chair-pose`
- `low-lunge`
- `warrior-ii`
- `triangle-pose`
- `standing-side-stretch`
- `tree-pose`
- `warrior-iii-balance`
- `standing-forward-bend`
- `wide-leg-forward-fold`
- `seated-breath-reset`

### Yoga / Relaxation

- `sukhasana-slow-breathing`
- `balasana-child-pose`
- `vajrasana`
- `baddha-konasana-butterfly`
- `supported-paschimottanasana`
- `viparita-karani-legs-on-wall`
- `supported-bridge`
- `shavasana`

### Breath

- `belly-breath`
- `box-breath`
- `box-breath-primer`
- `classic-box-breathing`
- `longer-box-breathing`
- `box-breathing-focus-set`
- `quiet-integration`

## Generation rules

Use one consistent character across the whole set:

- photorealistic adult fitness or yoga coach
- full body visible from head to feet
- plain studio or neutral wellness background
- realistic joint alignment and non-exaggerated posture
- no cropped limbs
- no extra people
- no dramatic perspective distortion
- consistent clothing across all poses

For external tutorial media, update `BREATH_TUTORIAL` or `BP_YOGA_TUTORIAL` in `script.js`.
