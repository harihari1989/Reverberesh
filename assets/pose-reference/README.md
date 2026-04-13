# Pose Reference Images

Drop AI-generated human pose images into this folder so the app can use real pose photos instead of the canvas guide when assets exist.

## Folder layout

Create:

- `assets/pose-reference/exercise/`
- `assets/pose-reference/yoga/`

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
- `warrior-ii`
- `standing-side-stretch`
- `tree-pose`
- `standing-forward-bend`
- `seated-breath-reset`

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

The per-pose prompts live in `script.js` under `POSE_REFERENCE_IMAGES`.
