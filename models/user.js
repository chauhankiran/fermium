'use strict';
const {
  Model
} = require('sequelize');
const formatDateBy = require("../utils/formatDateBy");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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