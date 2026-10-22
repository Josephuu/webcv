import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cv = JSON.parse(readFileSync(new URL("../src/content/cv.json", import.meta.url), "utf8"));

test("Printable and ATS CV headers retain the public webCV URL in the matching language", () => {
  assert.equal(cv.person.website, "https://josephuu.github.io/webcv/");
  for (const language of Object.keys(cv.locales)) {
    const target = cv.person.website + (language === "en" ? "?lang=en" : "");
    const base = new URL(`../public/cv/joseph-gavidia-${language}`, import.meta.url);
    const html = readFileSync(new URL(base.href + ".html"), "utf8");
    const text = readFileSync(new URL(base.href + ".txt"), "utf8");
    const header = html.match(/<header>([\s\S]*?)<\/header>/)?.[1];
    assert.ok(header, `${language}: missing resume header`);
    const anchor = header.match(new RegExp(`<a href="${target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">([^<]*)</a>`));
    assert.ok(anchor, `${language}: missing clickable webCV contact`);
    assert.ok(anchor[1].includes(target), `${language}: missing visible webCV URL`);
    assert.ok(text.includes(target), `${language}: missing webCV in ATS text`);
  }
});
