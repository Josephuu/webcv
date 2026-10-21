async (page) => {
  await page.goto("http://127.0.0.1:3000/webcv/");
  const english = page.getByRole("button", { name: "English", exact: true });
  if ((await english.count()) !== 1)
    throw new Error("Missing ES/EN language switch");
  await english.click();
  await page
    .getByRole("heading", { name: "From support to cloud administration." })
    .waitFor();
  if ((await page.locator("html").getAttribute("lang")) !== "en")
    throw new Error("Document language did not change");
  await page.reload();
  await page
    .getByRole("heading", { name: "From support to cloud administration." })
    .waitFor();
  await page.getByRole("button", { name: "Español", exact: true }).click();
  await page
    .getByRole("heading", { name: "Del soporte a la administración cloud." })
    .waitFor();
  if ((await page.locator("html").getAttribute("lang")) !== "es")
    throw new Error("Spanish language not restored");
  return {
    passed: true,
    checks: [
      "ES/EN switch",
      "localized headings",
      "html lang",
      "language survives reload",
      "return to Spanish",
    ],
  };
}
