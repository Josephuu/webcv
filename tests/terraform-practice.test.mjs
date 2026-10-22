import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cv = JSON.parse(readFileSync(new URL("../src/content/cv.json", import.meta.url), "utf8"));

test("Terraform skills recognize hands-on Key Vault plan/apply without excluding existing VM Applications work", () => {
  for (const [language, data] of Object.entries(cv.locales)) {
    const skill = data.skills.find((item) => item.tags.includes("Terraform"));
    assert.ok(skill, `${language}: missing Terraform skill`);
    assert.match(skill.note, /plan/);
    assert.match(skill.note, /apply/);
    assert.match(skill.note, /Azure Key Vault/);
    assert.match(skill.note, /PowerShell/);
    assert.match(skill.note, /VM Applications/);
  }
});
