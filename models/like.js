'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    username: DataTypes.STRING,
    gabId: DataTypes.INTEGER
  }, {});


  return Like;
};
