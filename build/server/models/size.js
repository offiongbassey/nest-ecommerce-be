'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Size extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Size.hasMany(models.Product_Size, {
                foreignKey: "size_id",
                as: "_size"
            });
        }
    }
    Size.init({
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("active", "blocked", "deleted"),
            defaultValue: "active"
        }
    }, {
        sequelize,
        modelName: 'Size',
    });
    return Size;
};
