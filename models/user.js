'use strict';
const {
  Model
} = require('sequelize');
const formatDateBy = require("../utils/formatDateBy");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // company relation with user.
      User.hasMany(models.Company, {
        foreignKey: "createdBy",
      });
      User.hasMany(models.Company, {
        foreignKey: "updatedBy",
      });

      // source pickup relation with user.
      User.hasMany(models.CompanySource, {
        foreignKey: "createdBy",
      });
      User.hasMany(models.CompanySource, {
        foreignKey: "updatedBy",
      });

      // stage pickup relation with user.
      User.hasMany(models.CompanyStage, {
        foreignKey: "createdBy",
      });
      User.hasMany(models.CompanyStage, {
        foreignKey: "updatedBy",
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return formatDateBy(this.getDataValue("createdAt"));
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return formatDateBy(this.getDataValue("updatedAt"));
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["password"],
      }
    },
  });
  return User;
};