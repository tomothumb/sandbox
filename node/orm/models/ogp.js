'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ogp = sequelize.define('Ogp', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
      tableName: 'Ogps',
      name: {
          singular: 'Ogp',
          plural: 'Ogps',
      }
  });
  Ogp.associate = function(models) {
    // associations can be defined here
      models.Ogp.belongsTo(models.User, {
          foreignKey: 'UserId',
          targetKey: 'id',
      });
  };
  return Ogp;
};