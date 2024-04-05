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
            yield queryInterface.addConstraint("Product_Inventories", {
                fields: ["product_id"],
                type: "foreign key",
                name: "product-inventory-association",
                references: {
                    table: "Products",
                    field: "id"
                }
            });
            yield queryInterface.addConstraint("Product_Images", {
                fields: ["product_id"],
                type: "foreign key",
                name: "product-image-association",
                references: {
                    table: "Products",
                    field: "id"
                }
            });
            yield queryInterface.addConstraint("Product_Sizes", {
                fields: ["product_id"],
                type: "foreign key",
                name: "product-size-association",
                references: {
                    table: "Products",
                    field: "id"
                }
            });
            yield queryInterface.addConstraint("Product_Sizes", {
                fields: ["size_id"],
                type: "foreign key",
                name: "size-association",
                references: {
                    table: "Sizes",
                    field: "id"
                }
            });
            yield queryInterface.addConstraint("Product_Colors", {
                fields: ["product_id"],
                type: "foreign key",
                name: "product-color-association",
                references: {
                    table: "Products",
                    field: "id"
                }
            });
            yield queryInterface.addConstraint("Product_Colors", {
                fields: ["color_id"],
                type: "foreign key",
                name: "color-association",
                references: {
                    table: "Colors",
                    field: "id"
                }
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.removeConstraint("Product_Inventories", "product-inventory-association");
            yield queryInterface.removeConstraint("Product_Images", "product-image-association");
            yield queryInterface.removeConstraint("Product_Sizes", "product-size-association");
            yield queryInterface.removeConstraint("Product_Sizes", "size-association");
            yield queryInterface.removeConstraint("Product_Colors", "product-color-association");
            yield queryInterface.removeConstraint("Product_Colors", "color-association");
        });
    }
};
