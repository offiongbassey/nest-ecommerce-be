'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Wishlist_Item extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Wishlist_Item.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "wishlist-product"
            });
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
