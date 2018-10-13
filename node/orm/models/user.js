'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING
  }, {
      tableName: 'Users',
      name: {
          singular: 'User',
          plural: 'Users',
      }
  });
  User.associate = function(models) {
    // associations can be defined here
      models.User.hasMany(models.Ogp,{
          foreignKey: 'UserId',
      });
  };
  return User;
};