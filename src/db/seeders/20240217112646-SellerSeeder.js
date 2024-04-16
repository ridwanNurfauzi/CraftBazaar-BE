'use strict';
const bcrypt = require('bcrypt');

function hashing_pass(pass) {
  const hash = bcrypt.hashSync(pass, 7);

  return hash;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sellers', [
      {
        code: '393b63',
        name: 'Penjual',
        email: 'p@g.id',
        description: 'Sebagai penjual dalam marketplace kerajinan tangan, kami menawarkan beragam produk unik yang dirancang dan dibuat secara manual dengan penuh dedikasi dan kreativitas. Dari perhiasan elegan hingga dekorasi rumah yang memesona, setiap barang kami adalah hasil dari sentuhan tangan ahli kami yang berusaha untuk menghadirkan keindahan dan keaslian dalam setiap detailnya. Kami mengutamakan kualitas tinggi dan kepuasan pelanggan, serta berkomitmen untuk memberikan pengalaman belanja yang menyenangkan dan memuaskan melalui layanan pelanggan yang ramah dan responsif.',
        password: hashing_pass('123456'),
        photo: 'black.jpg',
        createdAt: new Date(1410000000004),
        updatedAt: new Date(1420000000004)
      },
      {
        code: '3119a1',
        name: 'Penjual 1',
        email: 'p1@g.id',
        description: 'Sebagai penjual dalam marketplace kerajinan tangan, kami menawarkan beragam produk unik yang dirancang dan dibuat secara manual dengan penuh dedikasi dan kreativitas. Dari perhiasan elegan hingga dekorasi rumah yang memesona, setiap barang kami adalah hasil dari sentuhan tangan ahli kami yang berusaha untuk menghadirkan keindahan dan keaslian dalam setiap detailnya. Kami mengutamakan kualitas tinggi dan kepuasan pelanggan, serta berkomitmen untuk memberikan pengalaman belanja yang menyenangkan dan memuaskan melalui layanan pelanggan yang ramah dan responsif.',
        password: hashing_pass('123456'),
        photo: 'blue.jpg',
        createdAt: new Date(1410000000004),
        updatedAt: new Date(1420000000004)
      },
      {
        code: 'c5ea87',
        name: 'Penjual 2',
        email: 'p2@g.id',
        description: 'Sebagai penjual dalam marketplace kerajinan tangan, kami menawarkan beragam produk unik yang dirancang dan dibuat secara manual dengan penuh dedikasi dan kreativitas. Dari perhiasan elegan hingga dekorasi rumah yang memesona, setiap barang kami adalah hasil dari sentuhan tangan ahli kami yang berusaha untuk menghadirkan keindahan dan keaslian dalam setiap detailnya. Kami mengutamakan kualitas tinggi dan kepuasan pelanggan, serta berkomitmen untuk memberikan pengalaman belanja yang menyenangkan dan memuaskan melalui layanan pelanggan yang ramah dan responsif.',
        password: hashing_pass('123456'),
        photo: 'red.jpg',
        createdAt: new Date(1410000000004),
        updatedAt: new Date(1420000000004)
      },
      {
        code: 'd82ae0',
        name: 'Penjual 3',
        email: 'p3@g.id',
        description: 'Sebagai penjual dalam marketplace kerajinan tangan, kami menawarkan beragam produk unik yang dirancang dan dibuat secara manual dengan penuh dedikasi dan kreativitas. Dari perhiasan elegan hingga dekorasi rumah yang memesona, setiap barang kami adalah hasil dari sentuhan tangan ahli kami yang berusaha untuk menghadirkan keindahan dan keaslian dalam setiap detailnya. Kami mengutamakan kualitas tinggi dan kepuasan pelanggan, serta berkomitmen untuk memberikan pengalaman belanja yang menyenangkan dan memuaskan melalui layanan pelanggan yang ramah dan responsif.',
        password: hashing_pass('123456'),
        createdAt: new Date(1410000000004),
        updatedAt: new Date(1420000000004)
      },
      {
        code: 'ed410d',
        name: 'Penjual 4',
        email: 'p4@g.id',
        description: 'Sebagai penjual dalam marketplace kerajinan tangan, kami menawarkan beragam produk unik yang dirancang dan dibuat secara manual dengan penuh dedikasi dan kreativitas. Dari perhiasan elegan hingga dekorasi rumah yang memesona, setiap barang kami adalah hasil dari sentuhan tangan ahli kami yang berusaha untuk menghadirkan keindahan dan keaslian dalam setiap detailnya. Kami mengutamakan kualitas tinggi dan kepuasan pelanggan, serta berkomitmen untuk memberikan pengalaman belanja yang menyenangkan dan memuaskan melalui layanan pelanggan yang ramah dan responsif.',
        password: hashing_pass('123456'),
        photo: 'white.jpg',
        createdAt: new Date(1410000000004),
        updatedAt: new Date(1420000000004)
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sellers', null, {});
  }
};
