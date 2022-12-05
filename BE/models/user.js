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
    static associate({Favorite,Order,Address}) {
      // define association here
      
      this.hasMany(Favorite,{foreignKey:"index_user"})
      this.hasMany(Order,{foreignKey:"index_user",as:"user"})
      this.hasMany(Order,{foreignKey:"index_shipper",as:"shiper"})
      this.belongsTo(Address,{foreignKey:"index_address",as:"address"})
    

      
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    numberPhone: DataTypes.STRING,
    birthday: DataTypes.STRING,
    gender: DataTypes.STRING,
    type: DataTypes.STRING,
  //  index_address:DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};