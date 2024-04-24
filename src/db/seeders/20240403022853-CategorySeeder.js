'use strict';

const data = [
  {
    name: 'Bahan Bekas',
    createdAt: new Date(1400000000004),
    updatedAt: new Date(1400000000004)
  },
  {
    name: 'Kertas',
    createdAt: new Date(1401000000004),
    updatedAt: new Date(1401000000004)
  },
  {
    name: 'Sedotan',
    createdAt: new Date(1402000000004),
    updatedAt: new Date(1402007000004)
  },
  {
    name: 'Tanah Liat',
    createdAt: new Date(1403000000004),
    updatedAt: new Date(1403000000004)
  },
  {
    name: 'Origami',
    createdAt: new Date(1404000000004),
    updatedAt: new Date(1404000000004)
  },
  {
    name: 'Anyaman',
    createdAt: new Date(1405000000004),
    updatedAt: new Date(1405900000004)
  },
  {
    name: 'Stik Es',
    createdAt: new Date(1406000000004),
    updatedAt: new Date(1406000000004)
  },
  {
    name: 'Mainan',
    createdAt: new Date(1407000000004),
    updatedAt: new Date(1407800000004)
  },
  {
    name: 'Hiasan',
    createdAt: new Date(1408000000004),
    updatedAt: new Date(1408020000004)
  }
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
