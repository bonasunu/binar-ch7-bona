const db = require('../db/models')
const ac = require('../lib/roles')

const format = (user) => {
  const { id, username, role } = user
  return {
    id,
    username,
    role,
    accessToken: user.generateToken(),
  }
}

const getAllPlayers = async (req, res) => {
  const permission = await ac.can(req.user.role).readAny('players')
  if (!permission.granted) throw new Error('NoPermission')

  const players = await db.Player.findAll({
    include: [db.Room],
    where: {
      role: 'player',
    },
  })
  res.render('allPlayers', players)
}

const adminLogin = async (req, res) => res.render('adminLogin')

const authenticateAdmin = async (req, res) => {
  const user = await db.Player.authenticateUser(req.body)
  const activeUser = format(user)
  res.render('hello', { user: activeUser })
}

module.exports = {
  getAllPlayers,
  adminLogin,
  authenticateAdmin,
}
