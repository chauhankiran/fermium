'use strict';
const {
  Model
} = require('sequelize');
const formatDateBy = require("../utils/formatDateBy");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.belongsTo(models.CompanyStage, {
        as: "companyStage",
        foreignKey: "stageId",
      })
      Company.belongsTo(models.CompanySource, {
        as: "companySource",
        foreignKey: "sourceId",
      })
    }
  }
  Company.init({
    name: DataTypes.STRING,
    website: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    stageId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return formatDateBy(this.getDataValue("createdAt"))
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
    modelName: 'Company',
  });
  return Company;
};