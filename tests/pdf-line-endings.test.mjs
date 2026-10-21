import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('PDF content fingerprints survive Windows and Linux checkout line endings', () => {
  const cache = resolve(root, 'node_modules/.cache');
  mkdirSync(cache, { recursive: true });
  const temp = mkdtempSync(resolve(cache, 'cv-line-endings-'));
  try {
    const input = readFileSync(resolve(root, 'src/content/cv.json'), 'utf8').replaceAll('\r\n', '\n');
    const generator = readFileSync(resolve(root, 'scripts/generate-cv.mjs'), 'utf8');
    const hashes = [];
    for (const [id, source] of [['lf', input], ['crlf', input.replaceAll('\n', '\r\n')]]) {
      const dir = resolve(temp, id);
      mkdirSync(resolve(dir, 'src/content'), { recursive: true });
      mkdirSync(resolve(dir, 'scripts'), { recursive: true });
      writeFileSync(resolve(dir, 'src/content/cv.json'), source, 'utf8');
      writeFileSync(resolve(dir, 'scripts/generate-cv.mjs'), generator, 'utf8');
      execFileSync(process.execPath, [resolve(dir, 'scripts/generate-cv.mjs')], { cwd: dir });
      const html = readFileSync(resolve(dir, 'public/cv/joseph-gavidia-es.html'), 'utf8');
      hashes.push(html.match(/name="cv-source-sha256" content="([a-f0-9]+)"/)[1]);
    }
    assert.equal(hashes[0], hashes[1], 'Identical CV content must not require a PDF re-export after CRLF checkout');
  } finally { rmSync(temp, { recursive: true, force: true }); }
});
