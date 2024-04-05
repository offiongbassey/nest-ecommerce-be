'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addConstraint("Product_Inventories", {
    fields: ["product_id"],
    type: "foreign key",
    name: "product-inventory-association",
    references: {
      table: "Products",
      field: "id"
    }
   });

   await queryInterface.addConstraint("Product_Images", {
    fields: ["product_id"],
    type: "foreign key",
    name: "product-image-association",
    references: {
      table: "Products",
      field: "id"
    }
   });

   await queryInterface.addConstraint("Product_Sizes", {
    fields: ["product_id"],
    type: "foreign key",
    name: "product-size-association",
    references: {
      table: "Products",
      field: "id"
    }
   });

   await queryInterface.addConstraint("Product_Sizes", {
    fields: ["size_id"],
    type: "foreign key",
    name: "size-association",
    references: {
      table: "Sizes",
      field: "id"
    }
   });

   await queryInterface.addConstraint("Product_Colors", {
    fields: ["product_id"],
    type: "foreign key",
    name: "product-color-association",
    references: {
      table: "Products",
      field: "id"
    }
   });

   await queryInterface.addConstraint("Product_Colors", {
    fields: ["color_id"],
    type: "foreign key",
    name: "color-association",
    references: {
      table: "Colors",
      field: "id"
    }
   });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint("Product_Inventories", "product-inventory-association");
   await queryInterface.removeConstraint("Product_Images", "product-image-association");
   await queryInterface.removeConstraint("Product_Sizes", "product-size-association");
   await queryInterface.removeConstraint("Product_Sizes", "size-association");
   await queryInterface.removeConstraint("Product_Colors", "product-color-association");
   await queryInterface.removeConstraint("Product_Colors", "color-association");
  }
};
