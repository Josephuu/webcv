import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const component = new URL("../src/components/CvSite.tsx", import.meta.url);
const cv = JSON.parse(readFileSync(new URL("../src/content/cv.json", import.meta.url), "utf8"));
// Replace only Vite's build-time base URL; execute the real component and imports.
const source = readFileSync(component, "utf8").replaceAll("import.meta.env.BASE_URL", '"/webcv/"');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText;

test("CvSite renders every bilingual skill card when backup skills extend the content", () => {
  for (const [language, data] of Object.entries(cv.locales)) {
    const exports = {};
    runInNewContext(compiled, {
      exports,
      require: createRequire(component),
      window: { location: { search: `?lang=${language}` } },
      URLSearchParams,
    });
    const html = renderToStaticMarkup(createElement(exports.CvSite));
    assert.equal((html.match(/<article class="skill-card"/g) || []).length, data.skills.length);
    for (const skill of data.skills) assert.ok(html.includes(skill.title), `${language}: missing ${skill.title}`);
  }
});
