'use strict';
import {
  Model
} from 'sequelize';

type ProductColorAttributes = {
  product_id: number;
  color_id: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product_Color extends Model <ProductColorAttributes>
  implements ProductColorAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    product_id!: number;
    color_id!: number;
    status!: string;
    static associate(models: any) {
      // define association here
      Product_Color.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product_colors"
      });
      Product_Color.belongsTo(models.Color, {
        foreignKey: "color_id",
        as: "_color"
      })
    }
  }
  Product_Color.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Product_Color',
  });
  return Product_Color;
};