'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Robot Kertas',
        slug: 'Robot-Kertas',
        description: '',
        stock: 2,
        sold: 1,
        price: '500',
        weight: 1,
        seller_id: 1,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
