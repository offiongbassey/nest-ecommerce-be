'use strict';
import {
  Model
} from 'sequelize';

type ProductAttributes = {
  category_id: number;
  sub_category_id: number;
  store_id: number;
  name: string;
  product_code: string;
  description: string;
  slug: string;
  regular_price: number;
  promo_price: number;
  currency: string;
  tax_rate: number;
  status: string;
  views: number;
  best_seller: number;
  orders: number;
  quantity: number;
  quantity_sold: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product extends Model <ProductAttributes>
  implements ProductAttributes
  {
    category_id!: number;
    sub_category_id!: number;
    store_id!: number;
    name!: string;
    product_code!: string;
    description!: string;
    slug!: string;
    regular_price!: number;
    promo_price!: number;
    currency!: string;
    tax_rate!: number;
    status!: string;
    views!: number;
    best_seller!: number;
    orders!: number;
    quantity!: number;
    quantity_sold!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Product.hasMany(models.Product_Size, {
        foreignKey: "product_id",
        as: "product_sizes"
      });
      Product.hasMany(models.Product_Color, {
        foreignKey: "product_id",
        as: "product_colors"
      });
      Product.hasMany(models.Product_Image, {
        foreignKey: "product_id",
        as: "product_images"
      })
      Product.belongsTo(models.Store, {
        foreignKey: "store_id",
        as: "store"
      });
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category"
      })
      Product.belongsTo(models.SubCategory, {
        foreignKey: "sub_category_id",
        as: "sub_category"
      })
      Product.hasMany(models.Wishlist_Item, {
        foreignKey: "product_id",
        as: "wishlist-product"
      });
      Product.hasMany(models.Cart_Item, {
        foreignKey: "product_id",
        as: "cart-product"
      })


      // define association here
    }
  }
  Product.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    regular_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    promo_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "₦"
    },
    tax_rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "blocked", "deleted"),
      defaultValue: "active"
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    best_seller: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    orders: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    quantity_sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};