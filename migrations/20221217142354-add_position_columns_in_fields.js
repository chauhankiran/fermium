'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("fields", "row", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("fields", "column", {
      type: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("fields", "row");
    await queryInterface.removeColumn("fields", "column");
  }
};
