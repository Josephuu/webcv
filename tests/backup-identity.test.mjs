import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cv = JSON.parse(readFileSync(new URL("../src/content/cv.json", import.meta.url), "utf8"));

test("Backup skills distinguish Veeam experience from Azure Backup policy design and cross-region restores", () => {
  for (const [language, data] of Object.entries(cv.locales)) {
    const skill = data.skills.find((item) => item.tags.includes("Azure Backup"));
    assert.ok(skill, `${language}: missing Azure Backup skill`);
    assert.ok(skill.tags.includes("Veeam"), `${language}: missing Veeam experience`);
    assert.match(skill.note, /Veeam/);
    assert.match(skill.note, /Azure Backup/);
    assert.match(skill.note, /CRR/);
    assert.match(skill.note, language === "es" ? /políticas.*redundancia/i : /policies.*redundancy/i);
    assert.match(skill.note, language === "es" ? /restauraciones.*regiones/i : /restores.*Cross Region Restore/i);
    assert.doesNotMatch(skill.note, /Azure Site Recovery|RTO|RPO|VMware/);
  }
});

test("Systems skills include AD users and GPO with DNS/DHCP stated as knowledge", () => {
  for (const [language, data] of Object.entries(cv.locales)) {
    const skill = data.skills.find((item) => item.tags.includes("Windows Server"));
    assert.ok(skill, `${language}: missing Windows Server skill`);
    for (const tag of ["Active Directory", "GPO", "DNS", "DHCP"]) {
      assert.ok(skill.tags.includes(tag), `${language}: missing ${tag}`);
    }
    assert.match(skill.note, /Active Directory/);
    assert.match(skill.note, /GPO/);
    assert.match(skill.note, language === "es" ? /usuarios/ : /users/);
    assert.match(skill.note, language === "es" ? /Conocimientos de DNS y DHCP/ : /Knowledge of DNS and DHCP/);
    assert.match(skill.note, /GLPI.*Docker.*Linux/);
    assert.doesNotMatch(skill.note, /Entra Connect|trusts|forests|bosques|advanced DNS|DNS avanzado/i);
  }
});
