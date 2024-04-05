'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('Products', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                category_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                sub_category_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                store_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                product_code: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                slug: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                regular_price: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                promo_price: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                currency: {
                    type: Sequelize.STRING,
                    defaultValue: "₦"
                },
                tax_rate: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0
                },
                status: {
                    type: Sequelize.ENUM("pending", "active", "blocked", "deleted"),
                    allowNull: "pending"
                },
                views: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0
                },
                best_seller: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0
                },
                orders: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('Products');
        });
    }
};
