import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cv = JSON.parse(readFileSync(new URL("../src/content/cv.json", import.meta.url), "utf8"));

test("Infrastructure positioning leads with Microsoft operations and recovery without dropping team tooling", () => {
  assert.deepEqual(cv.featuredStack, [
    "Microsoft Azure", "Windows Server", "Active Directory / GPO", "Microsoft 365 / Entra ID",
    "PowerShell", "Azure Backup / Veeam", "Ansible", "Terraform",
  ]);
  for (const [language, data] of Object.entries(cv.locales)) {
    assert.match(data.ui.resumeTitle, /^Sysadmin SSR \|/);
    for (const term of ["Azure", "Windows Server", "Active Directory", "GPO", "Microsoft 365", "Entra ID", "Azure Backup", "CRR", "Veeam", "PowerShell", "Ansible"]) {
      assert.ok(data.profile.includes(term), `${language}: profile omits ${term}`);
    }
    assert.deepEqual(data.skills.map((skill) => skill.id), ["0", "3", "7", "2", "5", "4", "1", "6"]);
    for (const term of ["AKS", "Kubernetes", "Argo CD", "Azure DevOps", "GitHub"]) {
      assert.ok(JSON.stringify(data.skills).includes(term), `${language}: removed ${term}`);
    }
    assert.equal(data.projects[0].id, "eurekamakers");
    assert.doesNotMatch(JSON.stringify(data), /salary|salario|remuneración|VMware|Azure Site Recovery/);
  }
});

test("Yoizen bullets are concise while preserving concrete work and ownership limits", () => {
  for (const [language, data] of Object.entries(cv.locales)) {
    const job = data.jobs.find((item) => item.id === "yoizen");
    for (const bullet of job.bullets) {
      assert.ok(bullet.split(/\s+/).length <= 45, `${language}: oversized experience bullet`);
    }
    const text = job.bullets.join(" ");
    for (const term of ["Azure", "Entra ID", "Grafana", "DBA", "SQL Server", "SemaphoreUI", "Helm", "Ansible", "PowerShell", "Azure VM Applications", "Terraform", "GLPI", "Docker", "Linux", "SSO", "2FA", "SLAs", "Logic Apps", "Google Chat", "Google Calendar", "DIKS", "Markdown", "Git", "50%", "Action Groups"]) {
      assert.ok(text.includes(term), `${language}: removed contribution detail ${term}`);
    }
    assert.match(text, language === "es" ? /revisión humana/ : /human review/);
    assert.doesNotMatch(text, /Azure Backup|Veeam|CRR|Active Directory|GPO/);
  }
});

test("Static page metadata matches the approved infrastructure headline", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.ok(html.includes(`<title>${cv.person.name} — ${cv.locales.es.ui.resumeTitle}</title>`));
  assert.match(html, /<meta name="description" content="[^"]*Active Directory[^"]*Azure Backup/);
});
