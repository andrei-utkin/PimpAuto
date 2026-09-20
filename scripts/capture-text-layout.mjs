import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
for (const lang of ['ru', 'en', 'fr', 'pl', 'es']) {
  for (const width of [390, 1024]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto(`http://localhost:4321/${lang === 'ru' ? '' : `${lang}/`}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.hero img').evaluate(image => image.decode());
    await page.locator('.hero').screenshot({ path: `.impeccable/review/i18n-${lang}-${width}-hero.png` });
    if (['fr', 'pl'].includes(lang)) {
      for (const [selector, name] of [['.stores-section','stores'],['.request-section','form'],['.contact-section','contact']]) {
        await page.locator(selector).screenshot({ path: `.impeccable/review/i18n-${lang}-${width}-${name}.png` });
      }
    }
  }
}
await browser.close();
console.log('Five languages captured at mobile and intermediate desktop widths.');
