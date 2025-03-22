"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");
const AppError = require("../../utils/appError");

module.exports = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM("0", "1", "2"),
      allowNull: false,
      validate: {
        notNull:{
          msg: 'usertType cannot be null'
        },
        notEmpty:{
          msg: 'userType cannot be empty'
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'firstname cannot be null'
        },
        notEmpty:{
          msg: 'firstname cannot be empty'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'lastname cannot be null'
        },
        notEmpty:{
          msg: 'lastname cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'email cannot be null'
        },
        notEmpty:{
          msg: 'email cannot be empty'
        },
        isEmail:{
          msg: 'Invalid email id'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'password cannot be null'
        },
        notEmpty:{
          msg: 'password cannot be empty'
        }
      }
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,

      set(value) {
        if(this.password.length<7){
          throw new AppError('Password must be greater than 7',400);
        }
        if (this.password === value) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashPassword);
        } else {
          throw new AppError("Password and confirm password must be the same",400);
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "user",
  }
);
