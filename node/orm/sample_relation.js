const models = require('./models/');

// update sample
models.User.findAll({
    where: {
        isPortal: true,
    },
    include: [
        models.Ogp
    ]
}).then(users => {
    users[0].getOgps().then(targets => {
        targets.forEach((target)=>{
            target.title = 'update from relation';
            target.save();
            // crawlers[0].setOgps([target]).then(() => {});
            console.log("Updated Ogps",target.id);

        });
    });
});

