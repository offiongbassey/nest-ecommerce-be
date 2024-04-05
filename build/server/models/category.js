'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("active", "blocked", "deleted"),
            defaultValue: "active"
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        image_url: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};
