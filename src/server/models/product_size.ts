'use strict';
import {
  Model
} from 'sequelize';

type ProductSizeAttributes = {
  product_id: number;
  size_id: number;
  status: string;

}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product_Size extends Model <ProductSizeAttributes> 
  implements ProductSizeAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    product_id!: number;
    size_id!: number;
    status!: string;
    static associate(models: any) {
      Product_Size.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product_sizes"
      })
      Product_Size.belongsTo(models.Size, {
        foreignKey: "size_id",
        as: "_size"
      })
      // define association here
    }
  }
  Product_Size.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Product_Size',
  });
  return Product_Size;
};