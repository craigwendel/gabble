'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('User', {
    username: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Please enter a username'
      }
    }
  },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 6,
          msg: 'Password must be longer than 6 characters'
        },
        notEmpty: {
          msg: 'Please enter a password'
        }
      }
    },
    email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: 'Please enter a valid email address'
      },
      notEmpty: {
        msg: 'Please enter a email in the email field'
      }
    }
  }
}, {});
  return Users;
};
