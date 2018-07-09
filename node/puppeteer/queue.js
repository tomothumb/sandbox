const HCCrawler = require('headless-chrome-crawler');

(async () => {
    const crawler = await HCCrawler.launch({
        evaluatePage: (()=>({
            title: $('title').text(),
        })),
        onSuccess: ( results => {
            my_callback(results)
        })
    });

    await crawler.queue('https://yahoo.co.jp/');
    await crawler.queue(['https://google.com/','https://yahoo.com/']);
    await crawler.onIdle();
    await crawler.close();
})();

function my_callback(results){
    console.log(results.links,
        results.result.title);

    console.log('test');
}