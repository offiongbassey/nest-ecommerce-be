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
            yield queryInterface.addColumn("Categories", "image", {
                type: Sequelize.STRING,
                defaultValue: ""
            });
            yield queryInterface.addColumn("Categories", "image_url", {
                type: Sequelize.STRING,
                defaultValue: ""
            });
            yield queryInterface.addColumn("SubCategories", "image", {
                type: Sequelize.STRING,
                defaultValue: ""
            });
            yield queryInterface.addColumn("SubCategories", "image_url", {
                type: Sequelize.STRING,
                defaultValue: ""
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
            yield queryInterface.removeColumn("Categories", "image");
            yield queryInterface.removeColumn("SubCategories", "image");
            yield queryInterface.removeColumn("Categories", "image_url");
            yield queryInterface.removeColumn("SubCategories", "image_url");
            /**
             * Add reverting commands here.
             *
             * Example:
             * await queryInterface.dropTable('users');
             */
        });
    }
};
