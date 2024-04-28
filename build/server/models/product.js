'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.hasOne(models.Product_Inventory, {
                foreignKey: "product_id",
                as: 'product_inventory'
            });
            Product.hasMany(models.Product_Size, {
                foreignKey: "product_id",
                as: "product_sizes"
            });
            Product.hasMany(models.Product_Color, {
                foreignKey: "product_id",
                as: "product_colors"
            });
            Product.belongsTo(models.Store, {
                foreignKey: "store_id",
                as: "store"
            });
            Product.hasMany(models.Wishlist_Item, {
                foreignKey: "product_id",
                as: "wishlist-product"
            });
            Product.hasMany(models.Cart_Item, {
                foreignKey: "product_id",
                as: "cart_product"
            });
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
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
