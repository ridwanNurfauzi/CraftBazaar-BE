'use strict';

const data = [
  { name: 'Bahan Bekas' },
  { name: 'Kertas' },
  { name: 'Sedotan' },
  { name: 'Tanah Liat' },
  { name: 'Origami' },
  { name: 'Anyaman' },
  { name: 'Stik Es' },
  { name: 'Mainan' },
  { name: 'Hiasan' }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
