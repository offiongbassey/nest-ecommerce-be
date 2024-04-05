'use strict';
import {
  Model
} from 'sequelize';

type ProductInventoryAttributes = {
  product_id: number;
  quantity: number;
  quantity_sold: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product_Inventory extends Model <ProductInventoryAttributes> 
  implements ProductInventoryAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    product_id!: number;
    quantity!: number;
    quantity_sold!: number;
    status!: string;
    static associate(models: any) {
      Product_Inventory.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product_inventory"
      })
      // define association here
    }
  }
  Product_Inventory.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Product_Inventory',
  });
  return Product_Inventory;
};