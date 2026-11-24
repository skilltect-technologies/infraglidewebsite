import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

function getPublicDir() {
  const candidates = [
    path.join(__dirname, 'dist', 'client'),
    path.join(process.cwd(), 'dist', 'client'),
    path.join(__dirname, 'dist'),
    path.join(process.cwd(), 'dist'),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'index.html'))) {
      return dir;
    }
  }

  // Fallback: If build folder is missing on Hostinger, trigger vite build automatically
  try {
    console.log('[Server] dist/client/index.html not found. Running auto-build...');
    const viteBin = path.join(__dirname, 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
    const viteCmd = fs.existsSync(viteBin) ? `"${viteBin}"` : 'npx vite';
    execSync(`${viteCmd} build`, { cwd: __dirname });
    for (const dir of candidates) {
      if (fs.existsSync(path.join(dir, 'index.html'))) {
        return dir;
      }
    }
  } catch (err) {
    console.error('[Server] Auto build failed:', err.message);
  }

  return path.join(__dirname, 'dist', 'client');
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

const server = http.createServer((req, res) => {
  const publicDir = getPublicDir();
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(publicDir, reqPath);

  // SPA fallback: if requested file doesn't exist or is a directory, fallback to index.html
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(publicDir, 'index.html');
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      return res.end(`
        <div style="font-family:sans-serif;padding:30px;background:#0f172a;color:#f8fafc;">
          <h2 style="color:#f43f5e;">Build File Not Found</h2>
          <p>The server is running, but <code>index.html</code> was not found in <code>${publicDir}</code>.</p>
        </div>
      `);
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
