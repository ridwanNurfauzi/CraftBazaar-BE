'use strict';

const data = [
  {
    fileName: 'robot-kertas1.jpg',
    product_id: 1
  },
  {
    fileName: 'robot-kertas2.jpg',
    product_id: 1
  },
  {
    fileName: 'pesawat-kertas1.jpg',
    product_id: 2
  },
  {
    fileName: 'pesawat-kertas2.jpg',
    product_id: 2
  },
  {
    fileName: 'pesawat-kertas3.jpg',
    product_id: 2
  },
  {
    fileName: 'perahu-kertas1.jpg',
    product_id: 3
  },
  {
    fileName: 'perahu-kertas2.jpg',
    product_id: 3
  },
  {
    fileName: 'bunga-sedotan1.jpg',
    product_id: 4
  },
  {
    fileName: 'bunga-sedotan2.jpg',
    product_id: 4
  },
  {
    fileName: 'perahu-sedotan2.jpg',
    product_id: 5
  },
  {
    fileName: 'perahu-sedotan1.jpg',
    product_id: 5
  },
  {
    fileName: 'kupu-kupu-kertas1.jpg',
    product_id: 6
  },
  {
    fileName: 'kupu-kupu-kertas2.jpg',
    product_id: 6
  },
  {
    fileName: 'kupu-kupu-kertas3.jpg',
    product_id: 6
  },
  {
    fileName: 'sampul-buku-stik.jpg',
    product_id: 7
  },
  {
    fileName: 'kotak-pensil-stik.jpg',
    product_id: 8
  },
  {
    fileName: 'celengan-botol1.jpg',
    product_id: 9
  },
  {
    fileName: 'celengan-botol2.jpg',
    product_id: 9
  },
  {
    fileName: 'kipas-anyaman.jpg',
    product_id: 10
  },
  {
    fileName: 'sendal-anyaman.jpg',
    product_id: 11
  },
  {
    fileName: 'kuali-tanah-liat.jpg',
    product_id: 12
  },
  {
    fileName: 'piring-tanah-liat.jpg',
    product_id: 13
  },
  {
    fileName: 'guci-tanah-liat.jpg',
    product_id: 14
  },
  {
    fileName: 'vas-tanah-liat.jpg',
    product_id: 15
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_images', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', null, {});
  }
};
