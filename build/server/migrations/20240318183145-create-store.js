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
            yield queryInterface.createTable('Stores', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                vendor_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                store_code: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                desc: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                slug: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                status: {
                    type: Sequelize.ENUM("active", "blocked", "deleted"),
                    defaultValue: "active"
                },
                address: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                phone: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                alt_phone: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                state: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                city: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                logo: {
                    type: Sequelize.STRING,
                    allowNull: true
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
            yield queryInterface.dropTable('Stores');
        });
    }
};
