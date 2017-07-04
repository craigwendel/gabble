'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    username: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Please enter a message to Gabble!'
        }
      }
    }
  }, {});

  Gab.associate = function (models) {
    Gab.hasMany(models.Like, {as: 'like', foreignKey: 'gabId'})
  }

  return Gab;
};
