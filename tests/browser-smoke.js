async (page) => {
  const errors = [];
  const onError = error => errors.push(String(error));
  const onResponse = response => { if (response.url().startsWith('http://127.0.0.1:3000/') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); };
  page.on('pageerror', onError);
  page.on('response', onResponse);
  const results = [];
  try {
    for (const language of ['es', 'en']) {
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`http://127.0.0.1:3000/webcv/${language === 'en' ? '?lang=en' : ''}`);
        await page.locator('.job').first().waitFor();
        const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, headings: document.querySelectorAll('h1').length, unnamed: [...document.querySelectorAll('button,a')].filter(el => !el.textContent.trim() && !el.getAttribute('aria-label') && !el.getAttribute('title')).length, brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].map(el => el.getAttribute('href')).filter(href => href === '#' || !document.getElementById(href.slice(1))) }));
        if (layout.scrollWidth > width) throw new Error(`${language}/${width}: horizontal overflow ${layout.scrollWidth}`);
        if (layout.headings !== 1 || layout.unnamed || layout.brokenAnchors.length) throw new Error(`${language}/${width}: semantic/link failure ${JSON.stringify(layout)}`);
        for (const detail of await page.locator('.job-details').all()) {
          if (!await detail.getAttribute('open').then(value => value !== null)) await detail.locator('summary').click();
          const clipped = await detail.locator('ul').evaluate(el => el.scrollHeight > el.clientHeight + 1 || el.getBoundingClientRect().bottom > el.closest('.job-content').getBoundingClientRect().bottom + 1);
          if (clipped) throw new Error(`${language}/${width}: experience clipped`);
        }
        if (width < 1100) {
          const toggle = page.locator('.menu-button');
          await toggle.click();
          if (await toggle.getAttribute('aria-expanded') !== 'true') throw new Error('Menu did not open');
          await page.keyboard.press('Escape');
          if (await toggle.getAttribute('aria-expanded') !== 'false') throw new Error('Escape did not close menu');
          if (!await toggle.evaluate(el => el === document.activeElement)) throw new Error('Menu focus not restored');
          await toggle.click();
          await page.locator('#mobile-navigation a').first().click();
          if (await toggle.getAttribute('aria-expanded') !== 'false') throw new Error('Navigation did not close menu');
          if (!await page.locator('#mobile-navigation').evaluate(el => el.hidden)) throw new Error('Closed menu remains exposed');
        }
        for (const detail of await page.locator('.project-details').all()) {
          await detail.locator('summary').focus();
          await page.keyboard.press('Enter');
          if (await detail.getAttribute('open') === null) throw new Error('Project details not keyboard accessible');
          if (!await detail.locator('dl').isVisible()) throw new Error('Project details not visible');
          await detail.locator('summary').click();
        }
        const downloadLinks = [...new Set(await page.locator('a[download], .download-secondary').evaluateAll(links => links.map(link => link.href)))];
        for (const href of downloadLinks) {
          const response = await page.request.get(href);
          if (response.status() !== 200) throw new Error(`${language}: download failed ${response.status()} ${href}`);
          if (href.endsWith('.pdf') && !(await response.body()).subarray(0,5).toString().startsWith('%PDF-')) throw new Error('Wrong PDF response');
        }
        results.push({ language, width, scrollWidth: layout.scrollWidth, downloads: downloadLinks.length, experience: 'not clipped', menu: width < 1100 ? 'keyboard and focus passed' : 'desktop', projectDetails: 'keyboard passed' });
      }
    }
    if (errors.length) throw new Error(errors.join('\n'));
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:3000/webcv/');
    await page.screenshot({ path: 'D:/Proyectos/cv-uptodate/cv-preview-desktop.png', fullPage: false });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'D:/Proyectos/cv-uptodate/cv-preview-mobile.png', fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    return { passed: true, results, browserErrors: errors };
  } finally { page.off('pageerror', onError); page.off('response', onResponse); }
}
