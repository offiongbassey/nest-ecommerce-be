'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('SubCategories', {
      fields: ["category_id"],
      type: "foreign key",
      name: "sub-category-association",
      references: {
        table: "Categories",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Subcategories', 'sub-category-association')
  }
};
