'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user_game_biodata',
      [
        {
          uid: '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
          first_name: 'Harry',
          last_name: 'Potter',
          city: 'London',
        },
        {
          uid: '6dcb3b28-d798-4cec-80b5-516bfe18c25b',
          first_name: 'Ronald',
          last_name: 'Weasley',
          city: 'Liverpool',
        },
        {
          uid: '7bbe267d-e1aa-41d5-9a48-50e74fc04400',
          first_name: 'Hermione',
          last_name: 'Granger',
          city: 'Manchester',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_game_biodata', null, {})
  },
}
