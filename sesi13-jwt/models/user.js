'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        max: {
          args: 65,
          msg: 'Maksimal berumur 65 tahun'
        },
        min: {
          args: 17,
          msg: 'Minimal berumur 17 tahun'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};