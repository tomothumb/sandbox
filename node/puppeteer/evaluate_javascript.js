const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

puppeteer.launch({
    headless: false,
    slowMo: 100
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 2000});

    // Case D: Evaluate Javascript and get Dom information
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        return {
            location: location.href,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });
    console.log('Dimensions:', dimensions);
    await page.waitFor(3000);
    browser.close();

});