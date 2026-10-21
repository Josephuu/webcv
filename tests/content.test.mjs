import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const source = new URL("../src/content/cv.json", import.meta.url);

test("the public CV provides reviewed Spanish and English career content", () => {
  assert.ok(existsSync(source), "Missing bilingual public CV content");
  const cv = JSON.parse(readFileSync(source, "utf8"));
  assert.deepEqual(Object.keys(cv.locales).sort(), ["en", "es"]);
  for (const [language, content] of Object.entries(cv.locales)) {
    assert.equal(content.jobs[0].company, "Yoizen", language);
    assert.match(content.jobs[0].role, /Sysadmin SSR/, language);
    assert.deepEqual(
      content.jobs.map((job) => job.start),
      ["2024-10", "2023-10", "2021-09", "2020-10"],
    );
    assert.deepEqual(
      content.jobs.map((job) => job.end),
      [null, "2024-10", "2023-10", "2021-09"],
    );
    assert.equal(
      content.credentials.find((item) => item.id === "az-900").status,
      "earned",
    );
    assert.equal(
      content.credentials.find((item) => item.id === "az-104").status,
      "learning",
    );
    for (const technology of [
      "Azure DevOps",
      "Git",
      "GitHub",
      "Argo CD",
      "AKS",
      "Kubernetes",
      "Terraform",
      "Windows Server",
      "Entra ID",
    ]) {
      assert.ok(
        JSON.stringify(content).includes(technology),
        `${language}: missing ${technology}`,
      );
    }
    assert.equal(content.jobs.length, 4);
  }
});
