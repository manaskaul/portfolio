import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const BASE_DIR = './public/assets/images';

async function optimizeAll() {
  const folders = fs.readdirSync(BASE_DIR);
  // Find all directory names ending in -raw
  const rawFolders = folders.filter(f => {
    const fullPath = path.join(BASE_DIR, f);
    return f.endsWith('-raw') && fs.lstatSync(fullPath).isDirectory();
  });

  console.log(`🚀 Found ${rawFolders.length} raw categories to optimize...\n`);

  for (const rawFolder of rawFolders) {
    const category = rawFolder.replace('-raw', '');
    const sourcePath = path.join(BASE_DIR, rawFolder);
    const targetPath = path.join(BASE_DIR, category);

    // Ensure target exists
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    const files = fs.readdirSync(sourcePath);
    console.log(`📦 Processing Category: ${category} (${files.length} files) -> ${targetPath}`);

    for (const file of files) {
      if (file.startsWith('.')) continue; // Skip hidden files like .DS_Store

      const filePath = path.join(sourcePath, file);
      const ext = path.extname(file).toLowerCase();
      const baseName = path.parse(file).name;

      // Image Optimization: WebP + resize + strip metadata
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const outputWebp = path.join(targetPath, `${baseName}.webp`);
        console.log(`  - 🖼️  Optimizing image: ${file}`);
        try {
          await sharp(filePath)
            .rotate() // Extract orientation from EXIF
            .resize({ width: 2048, withoutEnlargement: true }) // Resizing for web
            .webp({ quality: 70, effort: 6 }) // Aggressive compression
            .toFile(outputWebp); // Sharp automatically strips non-essential metadata
        } catch (err) {
          console.error(`  - ❌ Image error (${file}):`, err.message);
        }
      }

      // Video Optimization: MP4 + scale + strip audio/metadata
      if (['.mov', '.mp4'].includes(ext)) {
        const outputMp4 = path.join(targetPath, `${baseName}.mp4`);
        console.log(`  - 🎥 Optimizing video: ${file}`);
        try {
          // ffmpeg: scale to height 1080 (maintaining aspect ratio), no audio, 10s max, CRF 28 for bandwidth efficiency
          const ffmpegCmd = `ffmpeg -y -i "${filePath}" -vf "scale='min(1080,iw)':-2" -an -t 10 -vcodec libx264 -crf 28 -pix_fmt yuv420p -map_metadata -1 "${outputMp4}"`;
          execSync(ffmpegCmd, { stdio: 'pipe' });
        } catch (err) {
          console.error(`  - ❌ Video error (${file}):`, err.message);
        }
      }
    }
    console.log('');
  }

  console.log('✅ Optimization complete across all categories.');
}

optimizeAll().catch(console.error);
