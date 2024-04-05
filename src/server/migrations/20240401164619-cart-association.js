'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("Carts", {
      fields: ["customer_id"],
      type: "foreign key",
      name: "cart-customer-association",
      references: {
        table: "Customers",
        field: "id"
      }
    });

    await queryInterface.addConstraint("Cart_Items", {
      fields: ["cart_id"],
      type: "foreign key",
      name: "cart-item-association",
      references: {
        table: "Carts",
        field: "id"
      }
    });

    await queryInterface.addConstraint("Cart_Items", {
      fields: ["product_id"],
      type: "foreign key",
      name: "cart-product-association",
      references: {
        table: "Products",
        field: "id"
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Carts", "cart-customer-association");
    await queryInterface.removeConstraint("Cart_Items", "cart-item-association");
    await queryInterface.removeConstraint("Cart_Items", "cart-product-association");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
