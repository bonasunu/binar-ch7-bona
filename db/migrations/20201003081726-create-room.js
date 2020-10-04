'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      creator: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user_game',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      members: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rooms')
  },
}
