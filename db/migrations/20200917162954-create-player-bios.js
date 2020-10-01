'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_game_biodata', {
      uid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'user_game',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_game_biodata')
  },
}
