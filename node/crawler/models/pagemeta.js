'use strict';
module.exports = (sequelize, DataTypes) => {
    var PageMeta = sequelize.define('PageMeta', {
        url: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        body: DataTypes.TEXT,
        image: DataTypes.STRING
    }, {
        tableName: 'PageMetas'
    });
    PageMeta.associate = function (models) {
        // associations can be defined here
    };
    return PageMeta;
};