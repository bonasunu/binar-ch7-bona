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
          role: 'player',
        },
        {
          id: '17709b9e-0f7d-4064-9a18-71e6a541812f',
          username: 'superadmin',
          password:
            '$2b$10$BETvvrOkA3JPrOFFYBdfxuur0I.P7dxdsqiAyk2YVZv1l4NumLjAa',
          role: 'admin',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_game', null, {})
  },
}
