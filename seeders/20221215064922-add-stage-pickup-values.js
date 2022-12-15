'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('companyStages', [
      {
        name: 'None', 
        active: true,
        createdAt: new Date()
      },
      {
        name: 'New', 
        active: true,
        createdAt: new Date()
      },
      {
        name: 'Discussion', 
        active: true,
        createdAt: new Date()
      },
      {
        name: 'Win', 
        active: true,
        createdAt: new Date()
      },
      {
        name: 'Close', 
        active: true,
        createdAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companyStages', null, {});
  }
};
