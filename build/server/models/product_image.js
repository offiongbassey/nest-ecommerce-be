'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product_Image extends sequelize_1.Model {
        static associate(models) {
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
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    }, {
        sequelize,
        modelName: 'Product_Image',
    });
    return Product_Image;
};
