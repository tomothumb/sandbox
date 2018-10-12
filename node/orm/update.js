const models = require('./models');

// console.log(db);

const addOgp = function () {
    models.Ogp.sync({force: false}).then(() => {
        models.Ogp.create({
            title: 'will update',
            description: 'sample',
            updatedAt: new Date(),
            createdAt: new Date()
        });
    });
};

console.log("add");
addOgp();
console.log("done");

// Documents
// http://docs.sequelizejs.com/manual/tutorial/instances.html#updating-saving-persisting-an-instance
models.Ogp.findOne({
    where: {
        title: 'will_update.js',
    }
}).then(ogp => {
    ogp.title = 'updated';
    ogp.description = 'sample';
    ogp.save().then(()=>{});

    ogp.update({
        title: 'updated2'
    }).then(() => {})
});

