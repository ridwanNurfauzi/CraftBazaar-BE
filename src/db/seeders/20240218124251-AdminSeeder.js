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
        password: hashing_pass('123456'),
        photo: 'black.jpg',
        createdAt: new Date(1410000000004),
        updatedAt: new Date(1420000000004)
      },
      {
        email: 'admin2@g.id',
        name: 'Admin 2',
        password: hashing_pass('123456'),
        createdAt: new Date(1410000000004),
        updatedAt: new Date(1410000000004)
      },
      {
        email: 'admin3@g.id',
        name: 'Admin 3',
        password: hashing_pass('123456'),
        photo: 'blue.jpg',
        createdAt: new Date(1430000000004),
        updatedAt: new Date(1430000000004)
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
