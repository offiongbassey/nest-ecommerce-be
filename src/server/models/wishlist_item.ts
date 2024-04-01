'use strict';
import {
  Model
} from 'sequelize';

type Wishlist_ItemAttributes = {
  wishlist_id: number;
  product_id: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Wishlist_Item extends Model<Wishlist_ItemAttributes> 
  implements Wishlist_ItemAttributes {
    wishlist_id!: number;
    product_id!: number;
    status!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Wishlist_Item.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "wishlist-product"
      })
    }
  }
  Wishlist_Item.init({
    wishlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Wishlist_Item',
  });
  return Wishlist_Item;
};