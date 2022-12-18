'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fields', [
      {
        name: 'id', 
        displayName: 'Id',
        module: 'companies',
        active: true,
        createdAt: new Date()
      },
      {
        name: 'name', 
        displayName: 'Name',
        module: 'companies',
        active: true,
        row: 1,
        column: 1,
        createdAt: new Date()
      },
      {
        name: 'website', 
        displayName: 'Website',
        module: 'companies',
        active: true,
        row: 1,
        column: 2,
        createdAt: new Date()
      },
      {
        name: 'createdAt', 
        displayName: 'Created at',
        module: 'companies',
        active: true,
        createdAt: new Date()
      },
      {
        name: 'updatedAt', 
        displayName: 'Updated at',
        module: 'companies',
        active: true,
        createdAt: new Date()
      },
      {
        name: 'sourceId', 
        displayName: 'Source',
        module: 'companies',
        active: true,
        row: 2,
        column: 1,
        createdAt: new Date()
      },
      {
        name: 'stageId', 
        displayName: 'Stage',
        module: 'companies',
        active: true,
        row: 2,
        column: 2,
        createdAt: new Date()
      },
      {
        name: 'createdBy', 
        displayName: 'Created by',
        module: 'companies',
        active: true,
        createdAt: new Date()
      },
      {
        name: 'updatedBy', 
        displayName: 'Updated by',
        module: 'companies',
        active: true,
        createdAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fields', null, {});
  }
};
