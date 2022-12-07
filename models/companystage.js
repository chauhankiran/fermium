'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyStage extends Model {
    static associate(models) {
      CompanyStage.hasMany(models.Company, {
        foreignKey: "sourceId",
      });
    }
  }
  CompanyStage.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompanyStage',
  });
  return CompanyStage;
};