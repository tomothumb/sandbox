const HCCrawler = require('headless-chrome-crawler');
const chalk = require("chalk");
const models = require('./models');

(async () => {
    const crawler = await HCCrawler.launch({
        evaluatePage: (()=>({
            title: $('title').text(),
            newslinks: $('a.storylink').map((index, element) => {
                return $(element).attr("href");
            })
        })),
        onSuccess: ( results => {
            deepCrawle(results)
        })
    });

    await crawler.queue('https://news.ycombinator.com/');
    await crawler.onIdle();
    await crawler.close();
})();

function deepCrawle(results){
    (async () => {
        const crawler = await HCCrawler.launch({
            // headless: false,
            // slowMo: 10,
            evaluatePage: (() => ({
                url: window.location.href,
                title: $('title').text(),
                description: $('meta[name="description"]').attr("content"),
                og_image: $('meta[property="og:image"]').attr("content"),
            })),
            onSuccess: (results => {
                savePageMetas(results)
            })
        });

        let urls = Object.values(results.result.newslinks);
        urls.pop();
        urls.pop();
        await crawler.queue(urls);
        await crawler.onIdle();
        await crawler.close();
    })();
}

function savePageMetas(results) {
    if (results.result.title) {
        console.log(
            "Save Meta: ",
            results.result.url,
            // chalk.green(results.result.title),
            // chalk.gray(results.result.description),
            // chalk.blue(results.result.og_image),
        );
        models.PageMeta.sync({force: false}).then(() => {
            models.PageMeta.create({
                url: results.result.url,
                title: results.result.title,
                description: results.result.description,
                image: results.result.og_image,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        });
    } else {
        console.log("error !!!");
    }
}