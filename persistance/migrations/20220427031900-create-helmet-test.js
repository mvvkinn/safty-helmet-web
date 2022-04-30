'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('helmet_tests', {
      helmet_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      temp: {
        type: Sequelize.FLOAT
      },
      humid: {
        type: Sequelize.FLOAT
      },
      photoresistor: {
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      distance: {
        type: Sequelize.INTEGER
      },
      shock: {
        type: Sequelize.BOOLEAN
      },
      worker_danger: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('helmet_tests');
  }
};