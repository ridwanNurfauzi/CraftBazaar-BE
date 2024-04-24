'use strict';

const data = [
  {
    rating: 4,
    text: 'Bagus',
    product_id: 1,
    user_id: 3,
    createdAt: new Date(1501000000004),
    updatedAt: new Date(1501000000004)
  },
  {
    rating: 4,
    text: 'Sangat Bagus',
    product_id: 3,
    user_id: 3,
    createdAt: new Date(1502000000004),
    updatedAt: new Date(1502000000004)
  },
  {
    rating: 3,
    text: 'Lumayan',
    product_id: 1,
    user_id: 1,
    createdAt: new Date(1503000000004),
    updatedAt: new Date(1503000000004)
  },
  {
    rating: 2,
    text: 'Mudah rusak.',
    product_id: 4,
    user_id: 1,
    createdAt: new Date(1504000000004),
    updatedAt: new Date(1504000000004)
  },
  {
    rating: 4,
    text: 'Warnanya kurang menarik.',
    product_id: 9,
    user_id: 2,
    createdAt: new Date(1505000000004),
    updatedAt: new Date(1505000000004)
  },
  {
    rating: 5,
    text: 'sangat bagus',
    product_id: 1,
    user_id: 2,
    createdAt: new Date(1507000000004),
    updatedAt: new Date(1507000000004)
  },
  {
    rating: 2,
    text: 'Mudah sobek',
    product_id: 1,
    user_id: 4,
    createdAt: new Date(1508000000004),
    updatedAt: new Date(1508000000004)
  },
  {
    rating: 2,
    text: 'Mudah pecah',
    product_id: 15,
    user_id: 3,
    createdAt: new Date(1509000000004),
    updatedAt: new Date(1509000000004)
  },
  {
    rating: 1,
    text: 'Mudah pecah',
    product_id: 13,
    user_id: 8,
    createdAt: new Date(1509000000004),
    updatedAt: new Date(1509000000004)
  },
  {
    rating: 3,
    text: 'Warnanya kurang menarik',
    product_id: 2,
    user_id: 2,
    createdAt: new Date(1510000000004),
    updatedAt: new Date(1510000000004)
  },
  {
    rating: 5,
    text: 'Sempurna',
    product_id: 4,
    user_id: 4,
    createdAt: new Date(1511000000004),
    updatedAt: new Date(1511000000004)
  },
  {
    rating: 4,
    text: 'Ukuran sesuai dengan buku',
    product_id: 7,
    user_id: 3,
    createdAt: new Date(1512000000004),
    updatedAt: new Date(1512000000004)
  },
  {
    rating: 2,
    text: 'Mudah sobek',
    product_id: 3,
    user_id: 1,
    createdAt: new Date(1513000000004),
    updatedAt: new Date(1513000000004)
  },
  {
    rating: 2,
    text: 'Mudah rusak',
    product_id: 10,
    user_id: 2,
    createdAt: new Date(1516000000004),
    updatedAt: new Date(1516000000004)
  },
  {
    rating: 4,
    text: 'Bagus',
    product_id: 8,
    user_id: 2,
    createdAt: new Date(1516000000004),
    updatedAt: new Date(1516000000004)
  },
  {
    rating: 5,
    text: 'Luar biasa.',
    product_id: 8,
    user_id: 1,
    createdAt: new Date(1526000000004),
    updatedAt: new Date(1526000000004)
  },
  {
    rating: 5,
    text: 'Nyaman saat digunakan.',
    product_id: 11,
    user_id: 1,
    createdAt: new Date(1522000000004),
    updatedAt: new Date(1522000000004)
  },
  {
    rating: 3,
    text: 'Lumayan.',
    product_id: 11,
    user_id: 5,
    createdAt: new Date(1526000000004),
    updatedAt: new Date(1526000000004)
  },
  {
    rating: 5,
    text: 'Warnanya menarik.',
    product_id: 6,
    user_id: 1,
    createdAt: new Date(1526000000004),
    updatedAt: new Date(1526000000004)
  },
  {
    rating: 4,
    text: 'Bentuknya menarik.',
    product_id: 6,
    user_id: 2,
    createdAt: new Date(1526000000004),
    updatedAt: new Date(1526000000004)
  },
  {
    rating: 4,
    text: 'Bagus cocok untuk dekorasi rumah..',
    product_id: 6,
    user_id: 6,
    createdAt: new Date(1526000000004),
    updatedAt: new Date(1526000000004)
  },
  {
    rating: 4,
    text: 'menarik',
    product_id: 6,
    user_id: 7,
    createdAt: new Date(1526000000004),
    updatedAt: new Date(1526000000004)
  },
  {
    rating: 4,
    text: 'menarik',
    product_id: 5,
    user_id: 7,
    createdAt: new Date(1516000000004),
    updatedAt: new Date(1516000000004)
  },
];

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
    await queryInterface.bulkInsert('reviews', data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
