import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("the download buttons have actual PDF documents for Spanish and English", () => {
  for (const language of ["es", "en"]) {
    const file = new URL(
      `../public/cv/joseph-gavidia-${language}.pdf`,
      import.meta.url,
    );
    assert.ok(existsSync(file), `${language}: PDF missing`);
    const bytes = readFileSync(file);
    assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
    assert.ok(bytes.length > 10000, `${language}: unexpectedly empty PDF`);
    assert.match(bytes.subarray(-1024).toString(), /%%EOF/);
  }
});
