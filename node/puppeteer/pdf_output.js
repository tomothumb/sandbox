const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

puppeteer.launch({
    headless: false,
    slowMo: 100
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 2000});

    // Case C: PDF output
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    await page.pdf({path: 'hn.pdf', format: 'A4'});
    await page.waitFor(3000);
    browser.close();

});