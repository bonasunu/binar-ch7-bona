const { Player } = require('../db/models')
const { v4: uuidv4 } = require('uuid')

const format = (user) => {
  const { id, username, role } = user
  return {
    id,
    username,
    role,
    accessToken: user.generateToken(),
  }
}

const homepage = async (req, res) => res.json({ info: 'Homepage' })

const login = async (req, res) => {
  const player = await Player.authenticateUser(req.body)
  res.json(format(player))
}

const register = async (req, res) => {
  try {
    await Player.registerUser({
      id: uuidv4(),
      username: req.body.username,
      password: req.body.password,
    })
  } catch (error) {
    console.log(error)
  }

  res.json({ info: 'Register success!' })
}

const whoAmI = async (req, res) => await res.json(req.user)

module.exports = {
  homepage,
  login,
  register,
  whoAmI,
}
