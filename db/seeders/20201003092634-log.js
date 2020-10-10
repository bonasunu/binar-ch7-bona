'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'logs',
      [
        {
          log_id: '689416d3-2c88-46b9-995b-0702ab31709d',
          room_id: 'c8868fd1-d2b5-440f-85da-e3e615445aa7',
          winner: [
            '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
            '7bbe267d-e1aa-41d5-9a48-50e74fc04400',
            '7bbe267d-e1aa-41d5-9a48-50e74fc04400',
          ],
          session: [
            '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
            '7bbe267d-e1aa-41d5-9a48-50e74fc04400',
          ],
          is_active: true,
          playing_date: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('logs', null, {})
  },
}
