import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
const cv = JSON.parse(
  readFileSync(new URL("../src/content/cv.json", import.meta.url), "utf8"),
);

test("downloadable HTML and ATS text preserve the shared CV in both languages", () => {
  for (const [language, data] of Object.entries(cv.locales)) {
    const base = new URL(
      `../public/cv/joseph-gavidia-${language}`,
      import.meta.url,
    );
    const htmlPath = new URL(base.href + ".html");
    const textPath = new URL(base.href + ".txt");
    assert.ok(existsSync(htmlPath), `${language}: missing printable CV`);
    assert.ok(existsSync(textPath), `${language}: missing ATS text`);
    const html = readFileSync(htmlPath, "utf8");
    const text = readFileSync(textPath, "utf8");
    assert.ok(html.includes(`<html lang="${language}">`));
    for (const job of data.jobs) {
      assert.ok(text.includes(job.role));
      assert.ok(text.includes(job.company));
      for (const bullet of job.bullets) assert.ok(text.includes(bullet));
    }
    assert.ok(text.includes(data.profile));
    assert.ok(text.includes(data.languages));
    for (const credential of data.credentials)
      assert.ok(text.includes(credential.detail));
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.equal((text.match(/Joseph Gavidia/g) || []).length, 1);
    assert.ok(!text.includes("570"));
  }
});
