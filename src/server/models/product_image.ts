'use strict';
import {
  Model
} from 'sequelize';

type ProductImageAttributes = {
  product_id: number;
  image_url: string;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product_Image extends Model <ProductImageAttributes>
  implements ProductImageAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    product_id!: number;
    image_url!: string;
    status!: string;
    static associate(models: any) {
      // define association here
    }
  }
  Product_Image.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "deleted"),
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Product_Image',
  });
  return Product_Image;
};