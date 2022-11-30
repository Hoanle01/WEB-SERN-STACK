'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Order}) {
      // define association here
      this.hasMany(User,{foreignKey:"index_address",as:"address"})
      this.hasMany(Order,{foreignKey:"index_address",as:"address1"})
 

    }
  }
  Address.init({
    district: DataTypes.STRING,
    street_name: DataTypes.STRING,
    province: DataTypes.STRING,
    ward: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};