import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const SOURCE_DIR = './public/assets/images/culinary-raw';
const TARGET_DIR = './public/assets/images/culinary';

async function processMedia() {
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR);

  for (const file of files) {
    const filePath = path.join(SOURCE_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.parse(file).name;

    // Image processing: .jpg, .jpeg to .webp
    if (ext === '.jpg' || ext === '.jpeg') {
      const outputWebp = path.join(TARGET_DIR, `${baseName}.webp`);
      
      console.log(`- Processing Image: ${file} -> ${baseName}.webp`);
      await sharp(filePath)
        .rotate() // Extract and execute EXIF orientation natively 
        .webp({ quality: 80 })
        .toFile(outputWebp);
    }

    // Video processing: .MOV to .mp4
    if (ext === '.mov') {
      const outputMp4 = path.join(TARGET_DIR, `${baseName}.mp4`);
      
      console.log(`- Processing Video: ${file} -> ${baseName}.mp4`);
      try {
        execSync(`ffmpeg -y -i "${filePath}" -an -t 10 -vcodec libx264 -crf 23 -pix_fmt yuv420p "${outputMp4}"`, { stdio: 'pipe' });
      } catch (err) {
        console.error(`- Error processing video ${file}:`, err.message);
      }
    }
  }

  console.log('\n--- Processing Complete ---');
}

processMedia().catch(console.error);
