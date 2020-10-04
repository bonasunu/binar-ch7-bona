'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'rooms',
      [
        {
          name: 'hogwarts',
          id: 'c8868fd1-d2b5-440f-85da-e3e615445aa7',
          creator: '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
          members: [
            '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
            '7bbe267d-e1aa-41d5-9a48-50e74fc04400',
          ],
          createdAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms', null, {})
  },
}
