/**
 * strip-metadata.js
 * Strips ALL metadata (EXIF, GPS, PII, camera info, timestamps) from every
 * .webp image and .mp4 video under public/assets/images/ (excluding -raw dirs).
 *
 * Images: re-written through sharp without .withMetadata() — removes all EXIF.
 * Videos: re-muxed through ffmpeg with -map_metadata -1 — removes all MP4 atoms.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const ROOT = './public/assets/images';

// Recursively collect all files, skipping -raw source dirs
function collectFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.endsWith('-raw')) results.push(...collectFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function stripImages(files) {
  const images = files.filter(f => f.endsWith('.webp'));
  console.log(`\n📷  Stripping metadata from ${images.length} WebP images...`);

  for (const file of images) {
    const tmp = file + '.tmp.webp';
    await sharp(file)
      // No .withMetadata() → sharp strips all EXIF/XMP/ICC by default
      .webp({ quality: 80 })
      .toFile(tmp);
    fs.renameSync(tmp, file); // atomic replace
    console.log(`  ✓ ${path.relative(ROOT, file)}`);
  }
}

function stripVideos(files) {
  const videos = files.filter(f => f.endsWith('.mp4'));
  console.log(`\n🎬  Stripping metadata from ${videos.length} MP4 videos...`);

  for (const file of videos) {
    const tmp = file + '.tmp.mp4';
    try {
      // -map_metadata -1  → drop all global metadata atoms
      // -map_chapters -1  → drop chapter list
      // -c copy           → stream-copy, no re-encode (fast, lossless)
      execSync(
        `ffmpeg -y -i "${file}" -map_metadata -1 -map_chapters -1 -c copy "${tmp}"`,
        { stdio: 'pipe' }
      );
      fs.renameSync(tmp, file);
      console.log(`  ✓ ${path.relative(ROOT, file)}`);
    } catch (err) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      console.error(`  ✗ ${path.relative(ROOT, file)}: ${err.message}`);
    }
  }
}

async function main() {
  console.log('🔒  Metadata Stripper — cleaning public/assets/images/');
  const all = collectFiles(ROOT);
  await stripImages(all);
  stripVideos(all);
  console.log('\n✅  All done — no EXIF, no GPS, no PII.');
}

main().catch(console.error);
