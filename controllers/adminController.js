const db = require('../db/models')
const ac = require('../lib/roles')

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
  await db.Player.authenticateUser(req.body)
  res.redirect('hello')
}

const hello = async (req, res) => res.render('hello')
module.exports = {
  getAllPlayers,
  adminLogin,
  authenticateAdmin,
  hello,
}
