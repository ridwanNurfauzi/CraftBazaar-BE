'use strict';
const bcrypt = require('bcrypt');

function hashing_pass(pass) {
  const hash = bcrypt.hashSync(pass, 7);

  return hash;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      {
        email: 'admin1@g.id',
        name: 'Admin 1',
        password: hashing_pass('123456')
      },
      {
        email: 'admin2@g.id',
        name: 'Admin 2',
        password: hashing_pass('123456')
      },
      {
        email: 'admin3@g.id',
        name: 'Admin 3',
        password: hashing_pass('123456')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
