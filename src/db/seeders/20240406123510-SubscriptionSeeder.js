'use strict';

const data = [
  {
    subscriber_id: 1,
    seller_id: 1
  },
  {
    subscriber_id: 1,
    seller_id: 2
  },
  {
    subscriber_id: 1,
    seller_id: 3
  },
  {
    subscriber_id: 1,
    seller_id: 4
  },
  {
    subscriber_id: 1,
    seller_id: 5
  },
  {
    subscriber_id: 2,
    seller_id: 1
  },
  {
    subscriber_id: 2,
    seller_id: 3
  },
  {
    subscriber_id: 2,
    seller_id: 4
  },
  {
    subscriber_id: 2,
    seller_id: 5
  },
  {
    subscriber_id: 3,
    seller_id: 2
  },
  {
    subscriber_id: 3,
    seller_id: 3
  },
  {
    subscriber_id: 3,
    seller_id: 4
  },
  {
    subscriber_id: 3,
    seller_id: 5
  },
  {
    subscriber_id: 4,
    seller_id: 2
  },
  {
    subscriber_id: 4,
    seller_id: 5
  },
  {
    subscriber_id: 5,
    seller_id: 2
  },
  {
    subscriber_id: 5,
    seller_id: 3
  },
  {
    subscriber_id: 5,
    seller_id: 4
  },
  {
    subscriber_id: 6,
    seller_id: 1
  },
  {
    subscriber_id: 6,
    seller_id: 3
  },
  {
    subscriber_id: 6,
    seller_id: 5
  },
  {
    subscriber_id: 7,
    seller_id: 1
  },
  {
    subscriber_id: 7,
    seller_id: 2
  },
  {
    subscriber_id: 7,
    seller_id: 5
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
    await queryInterface.bulkInsert('subscriptions', data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('subscriptions', null, {});
  }
};
