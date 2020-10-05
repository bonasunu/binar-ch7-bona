const AccessControl = require('accesscontrol')
const ac = new AccessControl()

ac.grant('player')
  .createOwn('create-room')
  .readOwn('whoami')
  .grant('admin')
  .extend('player')
  .createAny(['rooms, players, logs'])
  .readAny(['rooms, players, logs'])
  .updateAny(['rooms, players, logs'])
  .deleteAny(['rooms, players, logs'])

module.exports = ac
