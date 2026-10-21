async (page) => {
  const outputDir = '__CV_PDF_OUTPUT__';
  const results = [];
  for (const language of ["es", "en"]) {
    const response = await page.goto(
      `http://127.0.0.1:3000/webcv/cv/joseph-gavidia-${language}.html`,
    );
    if (!response || response.status() !== 200)
      throw new Error(`${language}: printable CV unavailable`);
    if ((await page.locator("h1").count()) !== 1)
      throw new Error(`${language}: duplicate CV header`);
    const text = await page.locator("main").innerText();
    if (!text.includes("Yoizen") || !text.includes("AZ-104"))
      throw new Error(`${language}: incomplete CV`);
    const sourceHash = await page.locator('meta[name="cv-source-sha256"]').getAttribute('content');
    if (!sourceHash) throw new Error(`${language}: missing source fingerprint`);
    await page.emulateMedia({ media: "print" });
    const pdf = await page.pdf({
      path: `${outputDir}/joseph-gavidia-${language}.pdf`,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    const sha256 = await page.evaluate(async bytes => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new Uint8Array(bytes)))].map(byte => byte.toString(16).padStart(2, '0')).join(''), Array.from(pdf));
    results.push({ language, sourceHash, sha256, bytes: pdf.length });
  }
  await page.emulateMedia({ media: "screen" });
  return { passed: true, files: results };
}
