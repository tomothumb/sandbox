const HCCrawler = require('headless-chrome-crawler');
const chalk = require("chalk");

(async () => {
    const crawler = await HCCrawler.launch({
        evaluatePage: (()=>({
            title: $('title').text(),
            newslinks: $('a.storylink').map((index, element) => $(element).attr("href") )
        })),
        onSuccess: ( results => {
            deepCrawle(results)
        })
    });

    await crawler.queue('https://news.ycombinator.com/');
    // await crawler.queue(['https://google.com/','https://yahoo.com/']);
    await crawler.onIdle();
    await crawler.close();
})();

function deepCrawle(results){
    console.log(results.result);
    console.log("Deeplink");

}
