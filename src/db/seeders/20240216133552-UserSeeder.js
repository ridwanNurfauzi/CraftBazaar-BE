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
        firstname: 'User',
        lastname: '0',
        email: 'usr@g.id',
        password: hashing_pass('123456'),
        photo: 'dark.jpg'
      },
      {
        firstname: 'user',
        lastname: '1',
        email: 'usr1@g.id',
        password: hashing_pass('123456'),
        photo: 'gray.jpg'
      },
      {
        firstname: 'User',
        lastname: '2',
        email: 'usr2@g.id',
        password: hashing_pass('123456'),
        photo: 'green.jpg'
      },
      {
        firstname: 'User',
        lastname: '3',
        email: 'usr3@g.id',
        password: hashing_pass('123456'),
        photo: 'yellow.jpg'
      },
      {
        firstname: 'User',
        lastname: '4',
        email: 'usr4@g.id',
        password: hashing_pass('123456')
      },
      {
        firstname: 'User',
        lastname: '5',
        email: 'usr5@g.id',
        password: hashing_pass('123456'),
        photo: 'purple.jpg'
      },
      {
        firstname: 'User',
        lastname: '6',
        email: 'usr6@g.id',
        password: hashing_pass('123456')
      },
      {
        firstname: 'User',
        lastname: '7',
        email: 'usr7@g.id',
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
