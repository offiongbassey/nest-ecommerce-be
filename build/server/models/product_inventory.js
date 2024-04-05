'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product_Inventory extends sequelize_1.Model {
        static associate(models) {
            Product_Inventory.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product_inventory"
            });
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
