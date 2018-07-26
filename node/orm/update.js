const models = require('./models');

// console.log(db);

const addOgp = function () {
    models.Ogp.sync({force: false}).then(() => {
        models.Ogp.create({
            title: 'update.js',
            description: 'sample',
            updatedAt: new Date(),
            createdAt: new Date()
        });
    });
};

console.log("add");
addOgp();
console.log("done");

