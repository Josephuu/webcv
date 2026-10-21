import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

test('PDFs match the public content revision and their recorded export bytes', () => {
  const path = new URL('../public/cv/pdf-manifest.json', import.meta.url);
  assert.ok(existsSync(path), 'Missing verified PDF export manifest');
  const manifest = JSON.parse(readFileSync(path, 'utf8'));
  assert.equal(manifest.passed, true);
  assert.deepEqual(manifest.files.map(item => item.language).sort(), ['en', 'es']);
  const sourceHash = hash(JSON.stringify(JSON.parse(readFileSync(new URL('../src/content/cv.json', import.meta.url), 'utf8'))));
  for (const entry of manifest.files) {
    assert.equal(entry.sourceHash, sourceHash, `${entry.language}: source changed; regenerate PDFs`);
    const pdf = readFileSync(new URL(`../public/cv/joseph-gavidia-${entry.language}.pdf`, import.meta.url));
    assert.equal(hash(pdf), entry.sha256, `${entry.language}: PDF changed after export`);
    assert.equal(pdf.length, entry.bytes);
  }
});
