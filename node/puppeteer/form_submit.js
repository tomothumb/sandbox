const puppeteer = require('puppeteer');

puppeteer.launch({
    headless: false,
    slowMo: 100
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 2000});

    // Case A: Form submit
    await page.goto('https://www.google.co.jp');
    await page.type('#lst-ib', 'puppeteer');
    await page.click('.lsb');
    await page.waitFor(5000);
    browser.close();



});