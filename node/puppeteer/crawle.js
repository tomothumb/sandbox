const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

puppeteer.launch({
    headless: false,
    slowMo: 100
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 2000});

    // Case E: Crawle
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    const element = await page.$('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.subtext > a:nth-child(6)');
    element.hover();
    await page.waitFor(1000);
    element.click();
    await page.waitFor(1000);
    const newelement = await page.$('#\\31 7468721 > td > table > tbody > tr > td.default > div:nth-child(1) > span > a.hnuser');
    newelement.click();
    await page.waitFor(1000);
    browser.close();

});