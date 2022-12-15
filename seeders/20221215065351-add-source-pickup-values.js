'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('companySources', [
      {
        name: 'None', 
        active: true,
        createdAt: new Date()
      },
      {
        name: 'Social Media', 
        active: true,
        createdAt: new Date()
      },
      {
        name: 'Campaign', 
        active: true,
        createdAt: new Date()
      },
      {
        name: 'Referral', 
        active: true,
        createdAt: new Date()
      },
      {
        name: 'Direct', 
        active: true,
        createdAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companySources', null, {});
  }
};
