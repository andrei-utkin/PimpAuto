import { chromium } from 'playwright-core';

const [url, output, widthArg = '1586', heightArg = '992', fullPageArg = 'false'] = process.argv.slice(2);

if (!url || !output) {
  throw new Error('Usage: node scripts/capture.mjs <url> <output> [width] [height] [fullPage]');
}

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: Number(widthArg), height: Number(heightArg) },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});

await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  })));
});
await page.screenshot({ path: output, fullPage: fullPageArg === 'true' });
await browser.close();
