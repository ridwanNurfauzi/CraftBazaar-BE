'use strict';
const bcrypt = require('bcrypt');

function hashing_pass(pass) {
  const hash = bcrypt.hashSync(pass, 7);

  return hash;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        firstname: 'kk',
        lastname: 'Ridwn',
        email: 'kk@g.id',
        password: hashing_pass('123456')
      },
      {
        firstname: 'user',
        lastname: '1',
        email: 'usr1@g.id',
        password: hashing_pass('123456')
      },
      {
        firstname: 'User',
        lastname: '2',
        email: 'usr2@g.id',
        password: hashing_pass('123456')
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
