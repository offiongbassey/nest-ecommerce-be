'use strict';
import {
  Model
} from 'sequelize';

type CartAttributes = {
  customer_id: number;
  total: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Cart extends Model<CartAttributes>
  implements CartAttributes {
    customer_id!: number;
    total!: number;
    status!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Cart.hasMany(models.Cart_Item, {
        foreignKey: "cart_id",
        as: "cart_items"
      })
    }
  }
  Cart.init({
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "blocked", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};