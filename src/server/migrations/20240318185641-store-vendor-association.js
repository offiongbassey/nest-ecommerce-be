'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Stores', {
      fields: ['vendor_id'],
      type: 'foreign key',
      name: 'store-vendor-association',
      references: {
        table: 'Vendors',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('Stores', 'store-vendor-association');
  }
};
