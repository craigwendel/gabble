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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Gab;
};
