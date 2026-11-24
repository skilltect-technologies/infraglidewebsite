// Generates dist/client/index.html by calling the built SSR handler in-process.
// Fallback for environments (e.g. Hostinger) where the TanStack prerender step
// cannot connect to its temporary localhost server.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "dist", "client", "index.html");

if (fs.existsSync(target)) {
  console.log("[ensure-shell] index.html already exists, skipping.");
  process.exit(0);
}

// Must be set before the server bundle loads so the shell header is honoured.
process.env.TSS_PRERENDERING = "true";

const mod = await import(pathToFileURL(path.join(root, "dist", "server", "server.js")).href);
const handler = mod.default;
const req = new Request("http://localhost/", { headers: { "X-TSS_SHELL": "true" } });
const res = await (handler.fetch ? handler.fetch(req) : handler(req));
if (!res.ok) throw new Error(`[ensure-shell] render failed: ${res.status}`);

fs.writeFileSync(target, await res.text());
console.log("[ensure-shell] Generated dist/client/index.html");
