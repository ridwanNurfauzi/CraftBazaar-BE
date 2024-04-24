'use strict';

const slugify = require('voca/slugify');

const products = [
  {
    name: 'Robot Kertas',
    slug: slugify('Robot Kertas'),
    description: 'Robot Kertas adalah inovasi revolusioner dalam dunia otomatisasi kantor, diciptakan untuk mengubah cara kerja sehari- hari menjadi lebih efisien dan efektif.Dengan desain yang ringkas namun canggih, robot ini mampu mengelola tugas - tugas administratif yang biasanya memakan waktu secara otomatis, seperti mencetak, memotong, dan melipat kertas dengan presisi tinggi.Dilengkapi dengan teknologi kecerdasan buatan terbaru, Robot Kertas dapat belajar dan menyesuaikan diri dengan pola kerja pengguna, menghasilkan output yang konsisten dan berkualitas tinggi setiap saat.Dengan kemampuan untuk berintegrasi dengan berbagai perangkat dan sistem manajemen dokumen, robot ini menjadi mitra ideal bagi bisnis modern yang mengutamakan produktivitas dan efisiensi.',
    stock: 223,
    sold: 4,
    price: '12000',
    weight: 1,
    seller_id: 1,
    createdAt: new Date(1500000000004),
    updatedAt: new Date(1510000000004)
  },
  {
    name: 'Pesawat Kertas',
    slug: slugify('Pesawat Kertas'),
    description: 'Pesawat Kertas adalah mainan kreatif yang memberikan kesempatan bagi pengguna untuk merasakan sensasi penerbangan tanpa meninggalkan tanah. Dibuat dengan teliti menggunakan kertas berkualitas tinggi, pesawat ini dirancang untuk memberikan stabilitas dan performa terbaik dalam penerbangan. Dengan desain yang menarik dan detail yang diperhatikan dengan cermat, pesawat kertas ini tidak hanya menyenangkan untuk dimainkan, tetapi juga memberikan pengalaman belajar yang berharga dalam memahami prinsip-prinsip dasar aerodinamika. Ideal untuk semua usia, pesawat kertas ini menjadi pilihan utama bagi mereka yang ingin merasakan pesona penerbangan dalam bentuk yang sederhana namun mendebarkan.',
    stock: 20,
    sold: 5,
    price: '500',
    weight: 1,
    seller_id: 2,
    createdAt: new Date(1510000000004),
    updatedAt: new Date(1512000000004)
  },
  {
    name: 'Perahu Kertas',
    slug: slugify('Perahu Kertas'),
    description: 'Hadiahkan keceriaan kepada anak-anak Anda dengan perahu kertas mainan yang menggembirakan ini! Dibuat dengan detail yang menawan, perahu kertas ini menjadi permainan yang menyenangkan di kolam, bak mandi, atau bahkan di taman. Dengan desain yang kuat dan tahan lama, anak-anak dapat mengarungi "lautan" imajinasi mereka dengan aman. Dilengkapi dengan warna-warna cerah yang memikat, perahu ini akan membawa kegembiraan yang tak terbatas ke setiap petualangan air mereka.',
    stock: 23,
    sold: 3,
    price: '500',
    weight: 1,
    seller_id: 3,
    createdAt: new Date(1511000000004),
    updatedAt: new Date(1511030000004)
  },
  {
    name: 'Bunga dari Sedotan',
    slug: slugify('Bunga dari Sedotan'),
    description: 'Bunga kreatif kami adalah simbol keindahan dan keberlanjutan. Terbuat dari sedotan mainan yang telah didaur ulang dengan sentuhan tangan yang teliti, setiap kelopak bunga menawarkan keunikan dan keanggunan yang tak tertandingi. Dari mawar elegan hingga bunga matahari yang menyala, setiap detail dipahat dengan cermat untuk menciptakan karya seni yang ramah lingkungan. Bunga-bunga ini tidak hanya mempercantik ruangan, tetapi juga menginspirasi kesadaran akan pentingnya mendaur ulang dan memanfaatkan kembali bahan-bahan untuk masa depan yang lebih berkelanjutan.',
    stock: 99,
    sold: 10,
    price: '2000',
    weight: 7,
    seller_id: 5,
    createdAt: new Date(1512000000004),
    updatedAt: new Date(1512000000004)
  },
  {
    name: 'Perahu Rakitan dari Sedotan',
    slug: slugify('Perahu Rakitan dari Sedotan'),
    description: 'Perahu Rakitan adalah mainan kreatif yang menghadirkan kesenangan tanpa batas bagi anak-anak yang ingin menjelajahi dunia perairan secara imajinatif. Terbuat dari bahan sedotan ramah lingkungan, mainan ini memberikan pengalaman belajar yang menyenangkan sambil mengajarkan konsep rakitan. Dengan kemampuan untuk merakit dan menghias perahu sesuai dengan imajinasi mereka sendiri, anak-anak dapat mengembangkan keterampilan motorik halus, kreativitas, dan pemecahan masalah. Dengan desain yang cerah dan menarik, Perahu Rakitan tidak hanya menjadi sumber hiburan, tetapi juga alat pembelajaran yang menarik bagi anak-anak di masa kecil mereka.',
    stock: 7,
    sold: 2,
    price: '2000',
    weight: 7,
    seller_id: 4,
    createdAt: new Date(1513000000004),
    updatedAt: new Date(1513000000004)
  },
  {
    name: 'Kupu-kupu Kertas',
    slug: slugify('Kupu-kupu Kertas'),
    description: 'Kupu-kupu Kertas adalah produk unik yang menghadirkan keindahan alam dalam bentuk yang indah dan berkesan. Setiap kupu-kupu dibuat secara hati-hati menggunakan kertas berkualitas tinggi, dengan detail yang memikat dan warna yang hidup. Produk ini cocok sebagai hiasan untuk dekorasi rumah, kantor, atau acara spesial, serta sebagai hadiah istimewa yang menyampaikan pesan kecantikan, kelembutan, dan keanggunan alam. Dengan sentuhan artistik dan kehalusan kerja yang tinggi, Kupu-kupu Kertas tidak hanya menjadi dekorasi visual yang menarik, tetapi juga menghadirkan nuansa kedamaian dan keajaiban alam yang abadi.',
    stock: 8,
    sold: 9,
    price: '2000',
    weight: 3,
    seller_id: 2,
    createdAt: new Date(1514000000004),
    updatedAt: new Date(1514030000004)
  },
  {
    name: 'Sampul Buku dari Stik Es Krim',
    slug: slugify('Sampul Buku dari Stik Es Krim'),
    description: 'Inovatif dan ramah lingkungan, sampul buku dari stik es krim kami adalah cara kreatif untuk mengurangi limbah plastik sambil tetap menawarkan kepraktisan dan gaya. Terbuat dari stik es krim bekas yang diolah dengan teknik daur ulang, produk kami hadir dalam berbagai warna dan desain yang menarik, cocok untuk melindungi dan mempercantik buku-buku Anda. Dengan konsep yang berkelanjutan, setiap pembelian produk kami tidak hanya memberikan manfaat fungsional tetapi juga menyumbang pada upaya pelestarian lingkungan.',
    stock: 0,
    sold: 3,
    price: '4000',
    weight: 7,
    seller_id: 1,
    createdAt: new Date(1515000000004),
    updatedAt: new Date(1515000000004)
  },
  {
    name: 'Kotak Pensil dari Stik Es Krim',
    slug: slugify('Kotak Pensil dari Stik Es Krim'),
    description: 'Kotak pensil yang unik ini merupakan hasil kreativitas yang ramah lingkungan, terbuat dari stik es krim yang didaur ulang. Dengan desain yang simpel namun menawan, kotak pensil ini menjadi pilihan yang tepat bagi mereka yang peduli akan lingkungan. Dengan ukuran yang pas untuk meletakkan pensil, pulpen, dan berbagai perlengkapan tulis lainnya, kotak ini tidak hanya fungsional namun juga memberikan sentuhan estetika yang menarik di meja belajar atau tempat kerja. Selain itu, penggunaan bahan daur ulang juga memberikan kesan yang berkelanjutan dalam upaya menjaga kelestarian lingkungan.',
    stock: 19,
    sold: 4,
    price: '6000',
    weight: 10,
    seller_id: 2,
    createdAt: new Date(1516000000004),
    updatedAt: new Date(1516200000004)
  },
  {
    name: 'Celengan dari Botol Bekas',
    slug: slugify('Celengan dari Botol Bekas'),
    description: 'Celengan kreatif ini merupakan hasil daur ulang dari botol plastik bekas yang diubah menjadi sebuah produk yang fungsional dan ramah lingkungan. Didesain dengan bentuk yang menarik, celengan ini tidak hanya berfungsi sebagai tempat menyimpan uang koin, tetapi juga sebagai pengingat pentingnya praktik daur ulang dan pengurangan limbah plastik. Dengan ukuran yang kompak dan ringan, celengan ini cocok untuk diletakkan di meja kerja, meja belajar, atau di ruang tamu sebagai dekorasi yang unik. Dengan membeli dan menggunakan celengan ini, Anda turut berkontribusi dalam upaya pelestarian lingkungan sambil merawat keuangan secara bertanggung jawab.',
    stock: 100,
    sold: 4,
    price: '4000',
    weight: 4,
    seller_id: 3,
    createdAt: new Date(1515000000004),
    updatedAt: new Date(1515200000004)
  },
  {
    name: 'Kipas Anyaman',
    slug: slugify('Kipas Anyaman'),
    description: 'Kipas Anyaman adalah produk unik yang menggabungkan keindahan seni anyaman tradisional dengan fungsi praktis kipas. Dibuat dengan teliti oleh para pengrajin terampil, kipas ini memadukan tangan-tangan terampil dengan bahan-bahan berkualitas tinggi untuk menciptakan karya yang elegan dan fungsional. Desainnya yang indah membuatnya cocok sebagai aksesori gaya untuk acara formal atau sebagai hadiah istimewa. Dengan kualitasnya yang tahan lama, kipas anyaman akan memberikan kesejukan yang menyegarkan di hari-hari yang panas, sambil menambah sentuhan artistik pada setiap penggunaannya.',
    stock: 10,
    sold: 2,
    price: '5000',
    weight: 200,
    seller_id: 5,
    createdAt: new Date(1520000000004),
    updatedAt: new Date(1520300000004)
  },
  {
    name: 'Sendal Anyaman',
    slug: slugify('Sendal Anyaman'),
    description: 'Nikmati kenyamanan alami dengan sendal anyaman kami yang memadukan gaya dan kepraktisan dalam satu desain yang elegan. Dibuat dengan teliti oleh pengrajin terampil, sendal ini terbuat dari serat alami yang kuat namun tetap ringan, memberikan dukungan yang optimal untuk kaki Anda. Dengan tali anyaman yang indah dan sol yang tahan lama, sendal ini cocok untuk berbagai kesempatan, dari santai di pantai hingga jalan-jalan sehari-hari di kota.Sendal anyaman kami menjadi pilihan ideal untuk gaya santai dan berkelas sepanjang hari.',
    stock: 80,
    sold: 0,
    price: '7000',
    weight: 100,
    seller_id: 4,
    createdAt: new Date(1521000000004),
    updatedAt: new Date(1521200000004)
  },
  {
    name: 'Kuali Tanah Liat',
    slug: slugify('Kuali Tanah Liat'),
    description: 'Kuali Tanah Liat adalah produk unggulan yang dibuat dengan cermat menggunakan bahan baku berkualitas tinggi. Dibuat dengan teknik tradisional yang telah teruji, kuali ini memiliki kelebihan dalam menyimpan dan menghantarkan panas secara merata, sehingga cocok digunakan untuk memasak berbagai hidangan dengan hasil yang lezat. Desainnya yang elegan dan tahan lama menjadikannya pilihan ideal untuk melengkapi dapur Anda. Dengan kuali tanah liat, Anda tidak hanya mendapatkan hasil masakan yang berkualitas, tetapi juga memperkaya pengalaman memasak Anda dengan kesan tradisional yang klasik.',
    stock: 5,
    sold: 0,
    price: '15000',
    weight: 2000,
    seller_id: 3,
    createdAt: new Date(1522000000004),
    updatedAt: new Date(1524000000004)
  },
  {
    name: 'Piring Tanah Liat',
    slug: slugify('Piring Tanah Liat'),
    description: 'Piring dari tanah liat yang kami tawarkan adalah produk berkualitas tinggi yang dibuat dengan teliti dan cermat oleh pengrajin berpengalaman. Setiap piring memiliki desain yang indah dan unik, menggabungkan sentuhan artistik dengan fungsi praktis sehari-hari. Bahan baku tanah liat alami memberikan keindahan alami dan ketahanan yang tahan lama, sehingga piring-piring ini cocok untuk digunakan dalam berbagai kesempatan, mulai dari acara formal hingga santai. Dengan kehalusan permukaan dan detail yang rapi, piring-piring ini menambah nilai estetika pada setiap meja makan. Tersedia dalam berbagai ukuran dan motif, produk ini merupakan pilihan yang sempurna untuk memperindah dan memperkaya pengalaman bersantap Anda.',
    stock: 100,
    sold: 2,
    price: '2000',
    weight: 700,
    seller_id: 2,
    createdAt: new Date(1523000000004),
    updatedAt: new Date(1523090000004)
  },
  {
    name: 'Guci Tanah Liat',
    slug: slugify('Guci Tanah Liat'),
    description: 'Guci dari Tanah Liat kami adalah karya seni tangan yang memukau, menggabungkan keindahan estetika tradisional dengan kepraktisan modern. Dibuat dengan cermat oleh pengrajin terampil, setiap guci menampilkan detail halus yang menawan dan kehalusan permukaan yang memikat. Material tanah liat berkualitas tinggi memberikan kekuatan dan daya tahan, sementara desainnya yang elegan menambahkan sentuhan keanggunan ke setiap ruang. Cocok untuk menyimpan air atau pun sebagai elemen dekoratif, guci ini adalah pilihan sempurna untuk menambahkan sentuhan artistik yang berkelas ke rumah atau ruang kerja Anda.',
    stock: 10,
    sold: 0,
    price: '16500',
    weight: 1800,
    seller_id: 1,
    createdAt: new Date(1524000000004),
    updatedAt: new Date(1524007000004)
  },
  {
    name: 'Vas Bunga Tanah Liat',
    slug: slugify('Vas Bunga Tanah Liat'),
    description: 'Vas bunga dari Tanah Liat yang kami tawarkan adalah karya seni fungsional yang memukau, menghadirkan keindahan alami dan kesan elegan dalam setiap ruangan. Dibuat dengan teliti oleh pengrajin terampil, setiap vas menampilkan desain yang unik dan detail yang halus, menambah sentuhan estetika yang memikat pada setiap bunga yang diatur di dalamnya. Material tanah liat berkualitas tinggi memberikan kekuatan dan daya tahan, sementara warna-warna alami yang hangat menciptakan harmoni dengan berbagai gaya dekorasi. Vas bunga ini tidak hanya berfungsi sebagai wadah untuk tanaman hias, tetapi juga sebagai pernyataan seni yang memikat untuk mempercantik ruang mana pun.',
    stock: 10,
    sold: 2,
    price: '15500',
    weight: 1200,
    seller_id: 5,
    createdAt: new Date(1526000000004),
    updatedAt: new Date(1526900000004)
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
