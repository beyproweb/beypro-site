Place the three provided screenshots into this folder with the following filenames:

- /public/assets/screenshots/home1.png   -> Home showcase image (icons grid)
- /public/assets/screenshots/home2.png   -> Home showcase image (table/grid screenshot)
- /public/assets/screenshots/home3.png   -> Home showcase image (staff/analytics screenshot)

Also place the feature detail screenshots:
- /public/assets/screenshots/feature_pos.png
- /public/assets/screenshots/feature_kitchen.png
- /public/assets/screenshots/pos_detail.png

Notes:
- After copying the files, restart the dev server if running.
- Paths expect the images under `public/assets/screenshots/`.

Image optimization (recommended):

1. Install dev dependencies (to get `sharp`):

```bash
npm install
```

2. Run the optimizer to generate webp/jpg resized images into `public/assets/screenshots/optimized`:

```bash
npm run optimize-images
```

3. Start dev server:

```bash
npm run dev
```

The site will automatically use the optimized webp/jpg sources when available and fall back to the original PNGs if not.
