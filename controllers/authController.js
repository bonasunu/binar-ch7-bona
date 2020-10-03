const { Player } = require('../db/models')
const { v4: uuidv4 } = require('uuid')

const format = (user) => {
  const { id, username } = user
  return {
    id,
    username,
    accessToken: user.generateToken(),
  }
}
const login = async (req, res) => {
  const player = await Player.authenticateUser(req.body)
  res.json(format(player))
}

const register = async (req, res) => {
  await Player.registerUser({
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
  })
  res.json({ info: 'Register success!' })
}

module.exports = {
  login,
  register,
}
