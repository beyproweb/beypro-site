import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Resize images placed in public/assets/screenshots
// Generates webp and jpg thumbnails into public/assets/screenshots/optimized

const SRC_DIR = path.resolve(process.cwd(), 'public/assets/screenshots');
const OUT_DIR = path.resolve(SRC_DIR, 'optimized');
const SIZES = [400, 800, 1200];

async function optimize() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error('Source directory does not exist:', SRC_DIR);
    process.exit(1);
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs.readdirSync(SRC_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
  if (files.length === 0) {
    console.log('No PNG/JPG files found in', SRC_DIR);
    process.exit(0);
  }

  for (const file of files) {
    const name = path.parse(file).name;
    const srcPath = path.join(SRC_DIR, file);
    for (const w of SIZES) {
      const outWebp = path.join(OUT_DIR, `${name}-w${w}.webp`);
      const outJpg = path.join(OUT_DIR, `${name}-w${w}.jpg`);
      try {
        await sharp(srcPath).resize({ width: w }).webp({ quality: 80 }).toFile(outWebp);
        await sharp(srcPath).resize({ width: w }).jpeg({ quality: 80 }).toFile(outJpg);
        console.log('Wrote', outWebp, outJpg);
      } catch (err) {
        console.error('Failed to process', srcPath, err);
      }
    }
  }
}

optimize();
