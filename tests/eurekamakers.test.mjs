import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cv = JSON.parse(readFileSync(new URL("../src/content/cv.json", import.meta.url), "utf8"));

test("EurekaMakers is a featured personal project with an accessible public demo in both languages", () => {
  for (const [language, data] of Object.entries(cv.locales)) {
    const project = data.projects.find((item) => item.id === "eurekamakers");
    assert.ok(project, `${language}: missing EurekaMakers`);
    assert.equal(data.projects[0].id, "eurekamakers");
    assert.match(project.context, /personal/i);
    assert.ok(!project.context.includes("Yoizen"));
    assert.equal(project.url, "https://www.eurekamakers.net/");
    assert.ok(project.linkLabel);
    assert.ok(project.resumeDescription);
    assert.ok(project.tags.includes("Azure Container Apps"));
    assert.ok(project.tags.includes("Docker"));
    assert.ok(!JSON.stringify(project).includes("github.com/Josephuu/remote-print-gateway"));
    assert.match(data.ui.projectsIntro, /personal/i);
  }
});

test("the personal project and its public URL are present in printable and ATS downloads", () => {
  for (const [language, data] of Object.entries(cv.locales)) {
    const project = data.projects.find((item) => item.id === "eurekamakers");
    for (const extension of ["html", "txt"]) {
      const text = readFileSync(new URL(`../public/cv/joseph-gavidia-${language}.${extension}`, import.meta.url), "utf8");
      assert.ok(text.includes(project.title), `${language}.${extension}: missing personal project`);
      assert.ok(text.includes(project.resumeDescription), `${language}.${extension}: missing contribution`);
      assert.ok(text.includes(project.url), `${language}.${extension}: missing live demo URL`);
    }
  }
});
