'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product_Size extends sequelize_1.Model {
        static associate(models) {
            Product_Size.belongsTo(models.Product, {
                foreignKey: "product_id",
                as: "product_sizes"
            });
            Product_Size.belongsTo(models.Size, {
                foreignKey: "size_id",
                as: "_size"
            });
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
