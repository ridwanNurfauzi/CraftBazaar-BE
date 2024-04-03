'use strict';
const bcrypt = require('bcrypt');

function hashing_pass(pass) {
  const hash = bcrypt.hashSync(pass, 7);

  return hash;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sellers', [
      {
        code: '393b63',
        name: 'kk',
        email: 'kk@g.id',
        password: hashing_pass('123456')
      },
      {
        code: '3119a1',
        name: 'Penjual 1',
        email: 'p1@g.id',
        password: hashing_pass('123456')
      },
      {
        code: 'c5ea87',
        name: 'Penjual 2',
        email: 'p2@g.id',
        password: hashing_pass('123456')
      },
      {
        code: 'd82ae0',
        name: 'Penjual 3',
        email: 'p3@g.id',
        password: hashing_pass('123456')
      },
      {
        code: 'ed410d',
        name: 'Penjual 4',
        email: 'p4@g.id',
        password: hashing_pass('123456')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sellers', null, {});
  }
};
