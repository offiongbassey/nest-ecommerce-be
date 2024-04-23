'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "quantity", {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    await queryInterface.addColumn("Products", "quantity_sold", {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "quantity");
    await queryInterface.removeColumn("Products", "quantity_sold");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
