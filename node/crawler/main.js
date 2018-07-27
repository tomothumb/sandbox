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
    // console.log(results.result);
    console.log("Deeplink");
    (async () => {
        const crawler = await HCCrawler.launch({
            evaluatePage: (() => ({
                title: $('title').text(),
                description: $('meta[name="description"]').attr("content"),
                og_image: $('meta[property="og:image"]').attr("content"),
            })),
            onSuccess: (results => {
                savePageMetas(results)
            })
        });

        // await crawler.queue('https://news.ycombinator.com/');
        await crawler.queue(Object.values(results.result.newslinks));

        // await crawler.queue(['https://google.com/','https://yahoo.com/']);
        await crawler.onIdle();
        await crawler.close();
    })();

}

function savePageMetas(results) {

    if (results.result.title) {
        console.log(
            chalk.green(results.result.title),
            chalk.gray(results.result.description),
            chalk.blue(results.result.og_image),
        );
    } else {
        console.log("error !!!");
    }
}