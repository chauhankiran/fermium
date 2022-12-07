'use strict';
const {
  Model
} = require('sequelize');
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
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};