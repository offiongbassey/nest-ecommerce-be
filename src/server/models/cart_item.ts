'use strict';
import {
  Model
} from 'sequelize';

type CartItemAttributes = {
  cart_id: number;
  product_id: number;
  quantity: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Cart_Item extends Model<CartItemAttributes>
  implements CartItemAttributes {
    cart_id!: number;
    product_id!: number;
    quantity!: number;
    status!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Cart_Item.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "cart-product"
      })
      // define association here
    }
  }
  Cart_Item.init({
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "blocked", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Cart_Item',
  });
  return Cart_Item;
};