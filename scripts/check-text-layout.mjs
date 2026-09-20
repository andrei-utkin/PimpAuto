import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const problems = [];
const comparisons = [];
for (const lang of ['ru', 'en', 'fr', 'pl', 'es']) {
  await page.goto(`http://localhost:4321/${lang === 'ru' ? '' : `${lang}/`}`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 360, 390, 432, 600, 760, 761, 820, 960, 1024, 1100, 1101, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 950 });
    const result = await page.evaluate(() => {
      const issues = [];
      const visible = el => el.getClientRects().length > 0 && !el.closest('svg');
      const label = el => el.id || `${el.tagName.toLowerCase()}.${el.className}`;
      for (const el of document.querySelectorAll('h1,h2,h3,p,a,button,label,dt,dd,.store-entry,.hero-copy,.request-form,.main-navigation')) {
        if (!visible(el) || el.classList.contains('skip-link')) continue;
        if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) issues.push(`${label(el)} internal overflow ${el.scrollWidth}/${el.clientWidth}`);
        const box = el.getBoundingClientRect();
        for (const child of el.childNodes) {
          if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) continue;
          const range = document.createRange(); range.selectNodeContents(child);
          for (const rect of range.getClientRects()) {
            if (rect.left < box.left - 2 || rect.right > box.right + 2) issues.push(`${label(el)} text exceeds its box: ${child.textContent.trim().slice(0, 50)}`);
          }
        }
      }
      for (const input of document.querySelectorAll('input[placeholder]')) {
        const style = getComputedStyle(input);
        const canvas = document.createElement('canvas').getContext('2d'); canvas.font = style.font;
        const available = input.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        if (canvas.measureText(input.placeholder).width > available + 2) issues.push(`Placeholder clipped: ${input.name} (${Math.round(available)}px available)`);
      }
      const hero = document.querySelector('.hero');
      const heading = document.querySelector('h1');
      const button = document.querySelector('.hero-actions');
      return { issues: [...new Set(issues)], pageOverflow: document.documentElement.scrollWidth > innerWidth, heroHeight: Math.round(hero.getBoundingClientRect().height), titleHeight: Math.round(heading.getBoundingClientRect().height), actionsTop: Math.round(button.getBoundingClientRect().top), headingWidth: Math.round(heading.getBoundingClientRect().width) };
    });
    if (result.issues.length || result.pageOverflow) problems.push({ lang, width, ...result });
    if ([390, 820, 1440].includes(width)) comparisons.push({ lang, width, heroHeight: result.heroHeight, titleHeight: result.titleHeight, actionsTop: result.actionsTop, headingWidth: result.headingWidth });
  }
}
for (const width of [390, 820, 1440]) {
  const rows = comparisons.filter(row => row.width === width);
  for (const key of ['heroHeight', 'actionsTop']) {
    const values = rows.map(row => row[key]);
    if (Math.max(...values) - Math.min(...values) > 2) problems.push({ width, error: `Cross-language ${key} drift`, values });
  }
}
for (const lang of ['ru', 'en', 'fr', 'pl', 'es']) {
  for (const width of [390, 1024]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto(`http://localhost:4321/${lang === 'ru' ? '' : `${lang}/`}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
      return { pageOverflow: document.documentElement.scrollWidth > innerWidth, elements: [...document.querySelectorAll('h1,h2,h3,p,nav,button,label,dd,a')].filter(el => el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2).map(el => el.className) };
    });
    if (result.pageOverflow || result.elements.length) problems.push({ lang, width, textScale: '200%', ...result });
  }
}
console.log(JSON.stringify({ problems, comparisons, enlargedTextChecks: 10 }, null, 2));
await browser.close();
if (problems.length) process.exitCode = 1;
