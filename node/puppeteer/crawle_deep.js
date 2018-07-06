const puppeteer = require('puppeteer');

puppeteer.launch({
    headless: true,
    slowMo: 100,
    timeout: 90 * 1000
}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 2000});


    await page.goto('https://qiita.com/');
    const element = await page.$('div.ra-TagList_tab > div:nth-child(2)');
    await element.click();
    await page.waitFor(1000);

    const resultsSelector = 'div.ra-TagList_content > div.ra-Tag > div.ra-Tag_start > div.ra-Tag_name.pr-1 > a';
    await page.waitForSelector(resultsSelector);
    // Extract the results from the page.
    const links = await page.evaluate(resultsSelector => {
        const anchors = Array.from(document.querySelectorAll(resultsSelector));
        return anchors.map(anchor => {
            return anchor.href;
        });
    }, resultsSelector);

    let detaillinks = [];
    await Promise.all(links.map(async function(link,index){
        await page.waitFor(1000 * index);
        console.log(index,link);
        const newpage = await browser.newPage();
        await newpage.goto(link);
        const followselector = '#main > div > div > div.col-sm-8.tagsShowMain > div.tagShowStats > div:nth-child(2) > div.count';
        const follownumber = await newpage.evaluate(followselector => {
            return document.querySelector(followselector).innerText;
        }, followselector);
        console.log(follownumber);

        const detaillink_selector = '#main > div > div > div.col-sm-8.tagsShowMain > section:nth-child(3) > div > article > div > div.ItemLink__title > a';
        const detaillinks_items = await newpage.evaluate(detaillink_selector => {
            const detail_anchors = Array.from(document.querySelectorAll(detaillink_selector));
            return detail_anchors.map(anchor => {
                return anchor.href;
            });
        }, detaillink_selector);

        detaillinks.push(detaillinks_items);
        newpage.close();

        // newpage.close();
        console.log(detaillinks_items);
    }));
    console.log(links);
    console.log(detaillinks);

    const detaillink_items = Array.prototype.concat.apply([], detaillinks);

    await Promise.all(detaillink_items.map(async function(link,index){
        await page.waitFor(1000 * index);
        console.log(index,link);
        const newpage = await browser.newPage();
        await newpage.goto(link);
        const pagetitle_selector = 'body > div.allWrapper > div:nth-child(5) > div > div:nth-child(1) > div > div.p-items_main > div > div.it-Header > h1';
        const title= await newpage.evaluate(pagetitle_selector => {
            return document.querySelector(pagetitle_selector).innerText;
        }, pagetitle_selector);
        console.log(title);
        newpage.close();
    }));
    browser.close();


});