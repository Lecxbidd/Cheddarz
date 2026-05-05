/**
 * Remove `.next` so dev/build chunks stay in sync (fixes ChunkLoadError / stale layout.js).
 * Stop `npm run dev` before running, or use `npm run dev:fresh` which starts dev after clean.
 */
const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, "..", ".next");

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("[clean-next] Removed .next");
} catch (err) {
  console.warn("[clean-next] Could not remove .next (close the dev server and retry):", err.message);
  process.exitCode = 1;
}
