const puppeteer = require('puppeteer');

puppeteer.launch({
    headless: false,
    slowMo: 100
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 2000});

    // Case A: Form submit
    // await page.goto('https://www.google.co.jp');
    // await page.type('#lst-ib', 'puppeteer');
    // await page.click('.lsb');
    // await page.waitFor(5000);
    // browser.close();

    // Case B: Dom manipulation
    // await page.goto('https://www.yahoo.co.jp/');
    // const element = await page.$('#economy');
    // await element.click();
    // await page.waitFor(3000);
    // browser.close();

    // Case C: PDF output
    // await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    // await page.pdf({path: 'hn.pdf', format: 'A4'});
    // await page.waitFor(3000);
    // browser.close();

    // Case D: Evaluate Javascript and get Dom information
    // await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    // // Get the "viewport" of the page, as reported by the page.
    // const dimensions = await page.evaluate(() => {
    //     return {
    //         location: location.href,
    //         width: document.documentElement.clientWidth,
    //         height: document.documentElement.clientHeight,
    //         deviceScaleFactor: window.devicePixelRatio
    //     };
    // });
    // console.log('Dimensions:', dimensions);
    // await page.waitFor(3000);
    // browser.close();

    // Case E: Crawle
    // await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    // const element = await page.$('#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.subtext > a:nth-child(6)');
    // element.hover();
    // await page.waitFor(1000);
    // element.click();
    // await page.waitFor(1000);
    // const newelement = await page.$('#\\31 7468721 > td > table > tbody > tr > td.default > div:nth-child(1) > span > a.hnuser');
    // newelement.click();
    // await page.waitFor(1000);
    // browser.close();


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


    await page.goto('https://www.yahoo.co.jp/');




});