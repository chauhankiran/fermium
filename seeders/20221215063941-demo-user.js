'use strict';

const crypto = require("crypto");
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password(10);
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex')

    console.log("Email: ", email);
    console.log("Password: ", password);

    await queryInterface.bulkInsert('users', [{
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email,
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
