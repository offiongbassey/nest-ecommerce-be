'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Categories", "image", {
      type: Sequelize.STRING,
      defaultValue: ""
    });

    await queryInterface.addColumn("Categories", "image_url", {
      type: Sequelize.STRING,
      defaultValue: ""
    });

    await queryInterface.addColumn("SubCategories", "image", {
      type: Sequelize.STRING,
      defaultValue: ""
    });

    await queryInterface.addColumn("SubCategories", "image_url", {
      type: Sequelize.STRING,
      defaultValue: ""
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Categories", "image");
    await queryInterface.removeColumn("SubCategories", "image");
    await queryInterface.removeColumn("Categories", "image_url");
    await queryInterface.removeColumn("SubCategories", "image_url");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
