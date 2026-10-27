import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'client' || entry.name === 'server') continue; // prevent recursive copy
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const clientDir = path.join(__dirname, 'dist', 'client');
const publicHtmlDir = path.join(__dirname, 'public_html');
const distRootDir = path.join(__dirname, 'dist');

if (fs.existsSync(clientDir)) {
  console.log('[Copy-Build] Copying dist/client to public_html and dist root...');
  copyDir(clientDir, publicHtmlDir);
  copyDir(clientDir, distRootDir);
  console.log('[Copy-Build] Successfully copied build files.');
}
