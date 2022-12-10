'use strict';
const {
  Model
} = require('sequelize');
const formatDateBy = require("../utils/formatDateBy");

module.exports = (sequelize, DataTypes) => {
  class CompanyStage extends Model {
    static associate(models) {
      CompanyStage.hasMany(models.Company, {
        foreignKey: "sourceId",
      });

      // User relation with stage pickup.
      CompanyStage.belongsTo(models.User, {
        as: "creator",
        foreignKey: "createdBy",
      });
      CompanyStage.belongsTo(models.User, {
        as: "updator",
        foreignKey: "updatedBy",
      });
    }
  }
  CompanyStage.init({
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
    modelName: 'CompanyStage',
  });
  return CompanyStage;
};