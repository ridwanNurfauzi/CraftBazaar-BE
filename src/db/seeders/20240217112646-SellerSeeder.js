'use strict';
const bcrypt = require('bcrypt');

function hashing_pass(pass) {
  const hash = bcrypt.hashSync(pass, 7);

  return hash;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('sellers', [
      {
        name: 'kk',
        email: 'kk@g.id',
        password: hashing_pass('123456')
      },
      {
        name: 'Penjual 1',
        email: 'p1@g.id',
        password: hashing_pass('123456')
      },
      {
        name: 'Penjual 2',
        email: 'p2@g.id',
        password: hashing_pass('123456')
      },
      {
        name: 'Penjual 3',
        email: 'p3@g.id',
        password: hashing_pass('123456')
      },
      {
        name: 'Penjual 4',
        email: 'p4@g.id',
        password: hashing_pass('123456')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sellers', null, {});
  }
};
