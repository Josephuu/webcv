import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { createHash } from "node:crypto";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cv = JSON.parse(
  readFileSync(resolve(root, "src/content/cv.json"), "utf8"),
);
const output = resolve(root, "public/cv");
const sourceHash = createHash("sha256")
  .update(JSON.stringify(cv))
  .digest("hex");
mkdirSync(output, { recursive: true });
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
const style = `@page{size:A4;margin:13mm 15mm}*{box-sizing:border-box}html{color-scheme:light}body{font:10.3pt/1.35 Arial,Helvetica,sans-serif;color:#152432;background:white;margin:0}main{max-width:185mm;margin:auto}h1{font-size:25pt;line-height:1.1;margin:0 0 5pt;letter-spacing:-.7pt}h2{font-size:11.5pt;margin:11pt 0 7pt;border-bottom:1pt solid #b5c9d0;padding-bottom:4pt;color:#173d49;break-after:avoid}h3{font-size:10.5pt;margin:0 0 3pt;break-after:avoid}p{margin:0 0 6pt}header{border-bottom:2pt solid #225562;padding-bottom:11pt}header>p:first-of-type{font-size:12pt;color:#225562;margin-bottom:8pt}.contacts{font-size:9pt;display:flex;gap:4pt 12pt;flex-wrap:wrap}.contacts a{color:inherit;text-decoration:none}.period{font-size:9pt;color:#435a64;margin-bottom:4pt}article{margin-bottom:9pt;break-inside:avoid}ul{padding-left:14pt;margin:4pt 0 0}li{padding-left:2pt;margin-bottom:3pt}section>p{margin-bottom:6pt}.skills p{font-size:9.5pt;line-height:1.35;margin-bottom:4pt}.credentials{display:grid;grid-template-columns:1fr 1fr;gap:5pt 18pt}.credentials article{margin:0 0 6pt}.credentials p{font-size:9pt;margin-bottom:2pt}.status{font-size:8pt;letter-spacing:.5pt;text-transform:uppercase;color:#35606a}.toolbar{display:flex;justify-content:space-between;gap:16px;max-width:185mm;margin:20px auto;padding:12px;background:#edf4f5;font:13px Arial}.toolbar a{color:#184650}.toolbar button{cursor:pointer;border:1px solid #225562;border-radius:4px;padding:8px 12px;background:white;color:#184650}a{overflow-wrap:anywhere}@media screen{body{padding:20px}.resume{padding:32px 35px;box-shadow:0 0 0 1px #d6e0e4}}@media(max-width:600px){body{padding:10px}.resume{padding:24px 18px}.credentials{grid-template-columns:1fr}.toolbar{flex-wrap:wrap}}@media print{.toolbar{display:none}.resume{box-shadow:none;padding:0}}`;
for (const [lang, data] of Object.entries(cv.locales)) {
  const { person } = cv;
  const headings = data.ui.resumeSections;
  const personalProjects = data.projects.filter((project) => project.resumeDescription);
  const webCvUrl = person.website + (lang === "en" ? "?lang=en" : "");
  const webCvLabel = lang === "es" ? "CV web" : "Web CV";
  const contacts = `${person.email} | ${person.phoneDisplay} | ${data.ui.location}\n${person.linkedin}\n${person.github}\n${webCvLabel}: ${webCvUrl}`;
  const text = [
    person.name,
    data.ui.resumeTitle,
    contacts,
    "",
    headings[0],
    data.profile,
    "",
    headings[1],
    ...data.jobs.flatMap((job) => [
      `${job.role} — ${job.company}`,
      job.period,
      ...job.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    headings[2],
    ...data.skills.map(
      (skill) => `${skill.title}: ${skill.tags.join(", ")}. ${skill.note}`,
    ),
    "",
    ...(personalProjects.length ? [
      data.ui.resumeProjectsTitle,
      ...personalProjects.flatMap((project) => [project.title, project.resumeDescription, project.url, ""]),
    ] : []),
    headings[3],
    ...data.credentials.flatMap((item) => [
      `${data.ui[item.status]}: ${item.title} — ${item.issuer}`,
      item.detail,
      "",
    ]),
    headings[4],
    data.languages,
  ].join("\n");
  const html = `<!doctype html>\n<html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escape(data.ui.resumeTitle)}"><title>${escape(person.name)} — CV ${lang.toUpperCase()}</title><meta name="cv-source-sha256" content="${sourceHash}"><style>${style}</style></head><body><nav class="toolbar" aria-label="${lang === "es" ? "Acciones del CV" : "CV actions"}"><a href="../${lang === "en" ? "?lang=en" : ""}">${escape(data.ui.back)}</a><button type="button" onclick="window.print()">${escape(data.ui.print)}</button></nav><main class="resume"><header><h1>${escape(person.name)}</h1><p>${escape(data.ui.resumeTitle)}</p><div class="contacts"><a href="mailto:${escape(person.email)}">${escape(person.email)}</a><a href="tel:${escape(person.phone)}">${escape(person.phoneDisplay)}</a><span>${escape(data.ui.location)}</span><a href="${escape(person.linkedin)}">${escape(person.linkedin)}</a><a href="${escape(person.github)}">${escape(person.github)}</a><a href="${escape(webCvUrl)}">${escape(webCvLabel)}: ${escape(webCvUrl)}</a></div></header><section><h2>${escape(headings[0])}</h2><p>${escape(data.profile)}</p></section><section><h2>${escape(headings[1])}</h2>${data.jobs.map((job) => `<article><h3>${escape(job.role)} — ${escape(job.company)}</h3><p class="period">${escape(job.period)}</p><ul>${job.bullets.map((bullet) => `<li>${escape(bullet)}</li>`).join("")}</ul></article>`).join("")}</section><section class="skills"><h2>${escape(headings[2])}</h2>${data.skills.map((skill) => `<p><strong>${escape(skill.title)}:</strong> ${escape(skill.tags.join(", "))}. ${escape(skill.note)}</p>`).join("")}</section>${personalProjects.length ? `<section><h2>${escape(data.ui.resumeProjectsTitle)}</h2>${personalProjects.map((project) => `<article><h3>${escape(project.title)}</h3><p>${escape(project.resumeDescription)} <a href="${escape(project.url)}">${escape(project.url)}</a></p></article>`).join("")}</section>` : ""}<section><h2>${escape(headings[3])}</h2><div class="credentials">${data.credentials.map((item) => `<article><p class="status">${escape(data.ui[item.status])}</p><h3>${escape(item.title)}</h3><p>${escape(item.issuer)}</p><p>${escape(item.detail)}</p></article>`).join("")}</div></section><section><h2>${escape(headings[4])}</h2><p>${escape(data.languages)}</p></section></main></body></html>\n`;
  writeFileSync(
    resolve(output, `joseph-gavidia-${lang}.txt`),
    text + "\n",
    "utf8",
  );
  writeFileSync(resolve(output, `joseph-gavidia-${lang}.html`), html, "utf8");
}
console.log(
  "Generated printable HTML and ATS text for Spanish and English from src/content/cv.json.",
);
