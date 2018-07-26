const Sequelize = require('sequelize');

const sequelize = new Sequelize('aa', '', '', {
    dialect: 'sqlite',
    storage: './database.sqlite'
});

module.exports = sequelize;
