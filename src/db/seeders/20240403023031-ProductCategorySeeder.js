'use strict';

const data = [
  {
    product_id: 1,
    category_id: 2
  },
  {
    product_id: 1,
    category_id: 5
  },
  {
    product_id: 1,
    category_id: 8
  },
  {
    product_id: 1,
    category_id: 9
  },
  {
    product_id: 2,
    category_id: 2
  },
  {
    product_id: 2,
    category_id: 5
  },
  {
    product_id: 2,
    category_id: 9
  },
  {
    product_id: 3,
    category_id: 2
  },
  {
    product_id: 3,
    category_id: 5
  },
  {
    product_id: 3,
    category_id: 9
  },
  {
    product_id: 4,
    category_id: 3
  },
  {
    product_id: 4,
    category_id: 9
  },
  {
    product_id: 5,
    category_id: 3
  },
  {
    product_id: 5,
    category_id: 8
  },
  {
    product_id: 6,
    category_id: 2
  },
  {
    product_id: 6,
    category_id: 9
  },
  {
    product_id: 7,
    category_id: 7
  },
  {
    product_id: 7,
    category_id: 9
  },
  {
    product_id: 8,
    category_id: 7
  },
  {
    product_id: 8,
    category_id: 9
  },
  {
    product_id: 9,
    category_id: 1
  },
  {
    product_id: 10,
    category_id: 6
  },
  {
    product_id: 11,
    category_id: 6
  },
  {
    product_id: 12,
    category_id: 4
  },
  {
    product_id: 13,
    category_id: 4
  },
  {
    product_id: 14,
    category_id: 4
  },
  {
    product_id: 15,
    category_id: 4
  },
  {
    product_id: 15,
    category_id: 9
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {});
  }
};
