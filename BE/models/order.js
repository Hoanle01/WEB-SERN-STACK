'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({User,Address,OrderDetail}) {
      // define association here
      this.belongsTo(User,{foreignKey:"index_user",as:"user"})
      this.belongsTo(User,{foreignKey:"index_shipper"})
      this.belongsTo(Address,{foreignKey:"index_address",as:"address1"})
      this.hasMany(OrderDetail,{foreignKey:"index_order"})

     }
  }
  Order.init({
    status: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};