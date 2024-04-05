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
            yield queryInterface.addConstraint("Carts", {
                fields: ["customer_id"],
                type: "foreign key",
                name: "cart-customer-association",
                references: {
                    table: "Customers",
                    field: "id"
                }
            });
            yield queryInterface.addConstraint("Cart_Items", {
                fields: ["cart_id"],
                type: "foreign key",
                name: "cart-item-association",
                references: {
                    table: "Carts",
                    field: "id"
                }
            });
            yield queryInterface.addConstraint("Cart_Items", {
                fields: ["product_id"],
                type: "foreign key",
                name: "cart-product-association",
                references: {
                    table: "Products",
                    field: "id"
                }
            });
            /**
             * Add altering commands here.
             *
             * Example:
             * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
             */
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.removeConstraint("Carts", "cart-customer-association");
            yield queryInterface.removeConstraint("Cart_Items", "cart-item-association");
            yield queryInterface.removeConstraint("Cart_Items", "cart-product-association");
            /**
             * Add reverting commands here.
             *
             * Example:
             * await queryInterface.dropTable('users');
             */
        });
    }
};
