'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Product,Order}) {
      // define association here
      this.belongsTo(Product,{foreignKey:"index_product",as:"product1"})
      this.belongsTo(Order,{foreignKey:"index_order"})
      // this.belongsTo(Order,{foreignKey:"index_order"})
    }
  }
  OrderDetail.init({
    product_quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};