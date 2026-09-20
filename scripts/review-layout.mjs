import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const problems = [];
const captures = new Set(['ru-1440', 'ru-390', 'pl-1440', 'pl-447']);
for (const [lang, route] of [['ru', '/'], ['en', '/en/'], ['fr', '/fr/'], ['pl', '/pl/'], ['es', '/es/']]) {
  for (const width of [320, 390, 447, 768, 1024, 1440]) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    page.on('pageerror', error => problems.push(`${lang} ${width}: ${error.message}`));
    const response = await page.goto(`http://localhost:4321${route}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      anchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
      h1: document.querySelectorAll('h1').length,
      forms: document.querySelectorAll('form').length,
      language: document.documentElement.lang,
    }));
    if (response.status() !== 200 || result.scroll > width || result.anchors.length || result.h1 !== 1 || result.forms !== 1 || result.language !== lang) problems.push({ lang, width, ...result });
    if (captures.has(`${lang}-${width}`)) {
      await page.locator('.car-photo').scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
        window.scrollTo(0, 0);
      });
      await page.screenshot({ path: `.impeccable/review/refined-${lang}-${width}.png`, fullPage: true });
      await page.screenshot({ path: `.impeccable/review/refined-${lang}-${width}-hero.png` });
    }
    await page.close();
  }
  console.log(`${lang}: six responsive widths checked`);
}
const page = await context.newPage();
await context.grantPermissions(['clipboard-read', 'clipboard-write']);
await page.goto('http://localhost:4321/pl/', { waitUntil: 'domcontentloaded' });
await page.locator('[name="car"]').fill('Test vehicle 1991');
await page.locator('[name="details"]').fill('Test part request');
await page.locator('button[type="submit"]').click();
await page.locator('#copy-result').waitFor({ state: 'visible' });
const copied = await page.evaluate(() => navigator.clipboard.readText());
if (!copied.includes('Test vehicle 1991') || !copied.includes('Test part request')) problems.push('Clipboard contents incomplete');
await page.evaluate(() => Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new Error('denied'); } }));
await page.locator('button[type="submit"]').click();
await page.locator('#manual-copy').waitFor({ state: 'visible' });
if (!(await page.locator('#request-draft').inputValue()).includes('Test part request')) problems.push('Manual fallback incomplete');
await page.goto('http://localhost:4321/pl/#stores', { waitUntil: 'domcontentloaded' });
await page.locator('.languages a[hreflang="fr"]').click();
await page.waitForURL('**/fr/#stores');
console.log('Clipboard, manual fallback, and language anchor checks passed');
console.log(JSON.stringify({ problems }, null, 2));
await browser.close();
if (problems.length) process.exitCode = 1;
