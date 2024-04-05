'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Cart.init({
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("pending", "active", "blocked", "deleted"),
            defaultValue: "active"
        }
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};
