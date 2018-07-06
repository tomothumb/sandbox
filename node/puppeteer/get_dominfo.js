const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

puppeteer.launch({
    headless: false,
    slowMo: 100
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 2000});


    // Case F: Get list data
    await page.goto('https://developers.google.com/web/');
    // Type into search box.
    await page.type('#searchbox input', 'Headless Chrome');
    // Wait for suggest overlay to appear and click "show all results".
    const allResultsSelector = '.devsite-suggest-all-results';
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);
    // Wait for the results page to load and display the results.
    const resultsSelector = '.gsc-results .gsc-thumbnail-inside a.gs-title';
    await page.waitForSelector(resultsSelector);
    // Extract the results from the page.
    const links = await page.evaluate(resultsSelector => {
        const anchors = Array.from(document.querySelectorAll(resultsSelector));
        return anchors.map(anchor => {
            const title = anchor.textContent.split('|')[0].trim();
            return `${title} - ${anchor.href}`;
        });
    }, resultsSelector);
    console.log(links.join('\n'));
    browser.close();


});