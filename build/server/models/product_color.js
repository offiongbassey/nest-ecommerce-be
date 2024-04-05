'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product_Color extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Product_Color.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product_colosr"
            });
            Product_Color.belongsTo(models.Color, {
                foreignKey: "color_id",
                as: "_color"
            });
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
