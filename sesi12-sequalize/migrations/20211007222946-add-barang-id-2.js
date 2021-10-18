'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await Promise.all([
      queryInterface.addColumn('Users', 'id_barang', {type: Sequelize.INTEGER}),
      queryInterface.addConstraint('Users', {
        fields: ['id_barang'],
        type: 'foreign key',
        name: 'user_barang',
        references: {
          table: 'barangs',
          field: 'id'
        }})
      ])},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await Promise.all([
      queryInterface.removeConstraint('Users', 'id_barang', {}),
      queryInterface.removeColumn('Users', 'id_barang', {})
     ])
  }
};
