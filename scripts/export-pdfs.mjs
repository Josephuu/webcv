import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const npm = process.env.npm_execpath;
if (!npm) throw new Error("Run this exporter with npm run export:pdf.");
const base = "http://127.0.0.1:3000/webcv/";
const output = resolve(root, "public/cv");
const cache = resolve(root, "node_modules/.cache/cv-pdf");
const probe = resolve(cache, "export-probe.js");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const cli = (...args) =>
  execFileSync(
    process.execPath,
    [
      npm,
      "exec",
      "--offline",
      "--yes",
      "--package=@playwright/cli",
      "--",
      "playwright-cli",
      "-s=cv-pdf-export",
      "--raw",
      ...args,
    ],
    { cwd: root, encoding: "utf8", timeout: 90000, maxBuffer: 2 * 1024 * 1024 },
  );
execFileSync(process.execPath, [resolve(root, "scripts/generate-cv.mjs")], {
  cwd: root,
  stdio: "inherit",
});
const response = await fetch(base);
if (!response.ok)
  throw new Error(`Start npm run dev on port 3000 first (${response.status}).`);
mkdirSync(cache, { recursive: true });
const template = readFileSync(resolve(root, "scripts/export-pdfs.js"), "utf8");
if (!template.includes("'__CV_PDF_OUTPUT__'"))
  throw new Error("Export probe placeholder missing.");
writeFileSync(
  probe,
  template.replace(
    "'__CV_PDF_OUTPUT__'",
    JSON.stringify(output.replaceAll("\\", "/")),
  ),
  "utf8",
);
try {
  cli("open", base, "--browser=chrome");
  const manifest = JSON.parse(cli("run-code", "--filename", probe));
  if (
    manifest.passed !== true ||
    !Array.isArray(manifest.files) ||
    manifest.files.length !== 2
  )
    throw new Error("Incomplete PDF export.");
  const expected = hash(JSON.stringify(JSON.parse(readFileSync(resolve(root, "src/content/cv.json"), "utf8"))));
  if (
    manifest.files
      .map((item) => item.language)
      .sort()
      .join(",") !== "en,es"
  )
    throw new Error("Unexpected PDF languages.");
  for (const item of manifest.files) {
    const pdf = readFileSync(
      resolve(output, `joseph-gavidia-${item.language}.pdf`),
    );
    if (
      item.sourceHash !== expected ||
      hash(pdf) !== item.sha256 ||
      pdf.length !== item.bytes ||
      pdf.subarray(0, 5).toString() !== "%PDF-"
    )
      throw new Error(`PDF export verification failed: ${item.language}`);
  }
  writeFileSync(
    resolve(output, "pdf-manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8",
  );
  console.log(
    "Exported and verified Spanish and English PDFs from the current public content.",
  );
} finally {
  try {
    cli("close");
  } catch (error) {
    console.error("Could not close export browser:", error.message);
  }
  rmSync(probe, { force: true });
}
