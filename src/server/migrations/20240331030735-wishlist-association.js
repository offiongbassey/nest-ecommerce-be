'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Wishlists', {
      fields: ['customer_id'],
      type: 'foreign key',
      name: 'wishlist-user-association',
      references: {
        table: 'Customers',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('Wishlist_Items', {
      fields: ['wishlist_id'],
      type: 'foreign key',
      name: 'wishlist-item-association',
      references: {
        table: 'Wishlists',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('Wishlist_Items', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'wishlist-product-association',
      references: {
        table: 'Products',
        field: 'id'
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
    await queryInterface.removeConstraint('Wishlists', 'wishlist-user-association');
    await queryInterface.removeConstraint('Wishlist_Items', 'wishlist-item-association');
    await queryInterface.removeConstraint('Wishlist_Items', 'wishlist-product-association');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
