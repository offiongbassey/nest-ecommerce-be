'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      regular_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      promo_price: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: "₦"
      },
      tax_rate: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM("pending", "active", "blocked", "deleted"),
        allowNull: "pending"
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      best_seller: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      orders: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};