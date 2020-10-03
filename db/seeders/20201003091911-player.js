'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user_game',
      [
        {
          id: '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
          username: 'harrypotter',
          password:
            '$2y$10$SlaxDjpvwTm3CRc.s99wm.fcQ81T5z0FhxkYy8zz7RBKQFF845tbO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_game', null, {})
  },
}
