const request = require('request');
const cheerio = require('cheerio');

const models = require('./models/');


models.PageMeta.findAll({
    where: {
        id: 2,
    }
}).then(pagemeta => {

    $ = cheerio.load(pagemeta[0].body);
    h1 = $("h1").text();

    console.log({
        id: 2,
        h1
    });
});
