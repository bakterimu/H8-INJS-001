'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.barang, { foreignKey: 'id_barang'})
    }
  };
  User.init({
    Nama: DataTypes.STRING,
    id_barang: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};