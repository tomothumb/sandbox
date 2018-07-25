'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ogp = sequelize.define('Ogp', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Ogp.associate = function(models) {
    // associations can be defined here
  };
  return Ogp;
};