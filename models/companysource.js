'use strict';
const {
  Model
} = require('sequelize');
const formatDateBy = require("../utils/formatDateBy");

module.exports = (sequelize, DataTypes) => {
  class CompanySource extends Model {
    static associate(models) {
      CompanySource.hasMany(models.Company, {
        foreignKey: "sourceId",
      });

      // User relation with source pickup.
      CompanySource.belongsTo(models.User, {
        as: "creator",
        foreignKey: "createdBy",
      });
      CompanySource.belongsTo(models.User, {
        as: "updator",
        foreignKey: "updatedBy",
      });
    }
  }
  CompanySource.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
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
  }, {
    sequelize,
    modelName: 'CompanySource',
  });
  return CompanySource;
};