'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('barangs', [
      {
        nama_barang: 'Kompor',
        harga: 120000,
        stok: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_barang: 'Gas LPG',
        harga: 35000,
        stok: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_barang: 'Wajan',
        harga: 30000,
        stok: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_barang: 'Piring',
        harga: 13000,
        stok: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('barangs', null, {});
  }
};
