import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const BATCHES = [
  { source: './public/assets/images/clicks-raw',  target: './public/assets/images/clicks' },
  { source: './public/assets/images/summit-raw',  target: './public/assets/images/summit' },
];

async function processDir(SOURCE_DIR, TARGET_DIR) {
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR);
  console.log(`\n=== Processing ${SOURCE_DIR} -> ${TARGET_DIR} ===`);

  for (const file of files) {
    const filePath = path.join(SOURCE_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.parse(file).name;

    if (ext === '.jpg' || ext === '.jpeg') {
      const outputWebp = path.join(TARGET_DIR, `${baseName}.webp`);
      console.log(`- Image: ${file} -> ${baseName}.webp`);
      await sharp(filePath)
        .rotate()
        .webp({ quality: 80 })
        .toFile(outputWebp);
    }

    if (ext === '.mov' || ext === '.mp4') {
      const outputMp4 = path.join(TARGET_DIR, `${baseName}.mp4`);
      console.log(`- Video: ${file} -> ${baseName}.mp4`);
      try {
        execSync(`ffmpeg -y -i "${filePath}" -an -t 10 -vcodec libx264 -crf 23 -pix_fmt yuv420p "${outputMp4}"`, { stdio: 'pipe' });
      } catch (err) {
        console.error(`  ERROR: ${err.message}`);
      }
    }
  }
}

async function main() {
  for (const { source, target } of BATCHES) {
    await processDir(source, target);
  }
  console.log('\n--- All Done ---');
}

main().catch(console.error);
