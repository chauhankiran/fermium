'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("companies", "sourceId", {
      type: Sequelize.INTEGER,
      references: {
        model: "companySources",
        key: "id",
      },
    });

    await queryInterface.addColumn("companies", "stageId", {
      type: Sequelize.INTEGER,
      references: {
        model: "companyStages",
        key: "id",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("companies", "sourceId");
    await queryInterface.removeColumn("companies", "stageId");
  }
};
