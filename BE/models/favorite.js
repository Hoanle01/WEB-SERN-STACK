'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product,User}) {
     this.belongsTo(Product,{foreignKey:"index_product",as:"product"})
     this.belongsTo(User,{foreignKey:"index_user"})
     // define association here
    }
  }
  Favorite.init({}, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};
