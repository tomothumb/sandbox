const HCCrawler = require('headless-chrome-crawler');

(async () => {
    const crawler = await HCCrawler.launch({
        evaluatePage: (()=>({
            title: $('title').text(),
        })),
        onSuccess: ( results => {
            console.log(results.result);
        })
    });

    await crawler.queue('https://yahoo.co.jp/');
    await crawler.queue(['https://google.com/','https://yahoo.com/']);
    await crawler.onIdle();
    await crawler.close();
})();