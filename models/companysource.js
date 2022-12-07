'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanySource extends Model {
    static associate(models) {
      CompanySource.hasMany(models.Company, {
        foreignKey: "sourceId",
      });
    }
  }
  CompanySource.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompanySource',
  });
  return CompanySource;
};