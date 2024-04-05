'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Color extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Color.hasMany(models.Product_Color, {
                foreignKey: "color_id",
                as: "_color"
            });
        }
    }
    Color.init({
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("active", "blocked", "deleted"),
            defaultValue: "active"
        }
    }, {
        sequelize,
        modelName: 'Color',
    });
    return Color;
};
