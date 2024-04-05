'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("Products", {
      fields: ["category_id"],
      type: "foreign key",
      name: "product-category-association",
      references: {
        table: "Categories",
        field: "id"
      }
    })
    await queryInterface.addConstraint("Products", {
      fields: ["sub_category_id"],
      type: "foreign key",
      name: "product-sub-cat-association",
      references: {
        table: "SubCategories",
        field: "id"
      }
    })
    await queryInterface.addConstraint("Products", {
      fields: ["store_id"],
      type: "foreign key",
      name: "product-store-association",
      references: {
        table: "Stores",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Products", "product-category-association");
    await queryInterface.removeConstraint("Products", "product-sub-cat-association");
    await queryInterface.removeConstraint("Products", "product-store-association");
  }
};
