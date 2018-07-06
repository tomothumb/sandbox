const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

puppeteer.launch({
    headless: false,
    slowMo: 100
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 2000});


    // Case B: Dom manipulation
    await page.goto('https://www.yahoo.co.jp/');
    const element = await page.$('#economy');
    await element.click();
    await page.waitFor(3000);
    browser.close();


});