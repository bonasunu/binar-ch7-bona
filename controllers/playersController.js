const { v4: uuidv4 } = require('uuid')
const db = require('../db/models')

const getAllPlayers = async (req, res) => {
  const players = await db.Player.findAll({
    include: [db.PlayerBio, db.PlayerHistory],
  })
  res.render('players/allPlayers', { players })
}

const getPlayerById = async (req, res) => {
  const player = await db.Player.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.PlayerBio, db.PlayerHistory],
  })
  res.render('players/playerDetail', { player })
}

const createPlayerForm = async (req, res) => {
  res.render('create')
}

const createPlayer = async (req, res) => {
  const player = req.body
  const uuid = uuidv4()
  await db.Player.create(
    {
      id: uuid,
      username: player.username,
      email: player.email,
      PlayerBio: {
        uid: uuid,
      },
      PlayerHistories: [
        {
          log_id: uuidv4(),
          user_id: uuid,
        },
      ],
    },
    {
      include: [db.PlayerBio, db.PlayerHistory],
    }
  )

  res.render('create-success')
}

const deletePlayer = async (req, res) => {
  await db.Player.destroy({
    where: {
      id: req.params.id,
    },
  })

  res.render('delete')
}

const updatePlayerForm = async (req, res) => {
  const player = await db.Player.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.PlayerBio, db.PlayerHistory],
  })
  res.render('update', { player })
}

const updatePlayer = async (req, res) => {
  const data = req.body

  await db.Player.update(
    { email: data.email },
    {
      where: {
        id: req.params.id,
      },
    }
  )

  await db.PlayerBio.update(
    {
      first_name: data.first_name,
      last_name: data.last_name,
      city: data.city,
    },
    {
      where: {
        uid: req.params.id,
      },
    }
  )

  await db.PlayerHistory.update(
    {
      level: data.level,
      experience: data.experience,
    },
    {
      where: {
        user_id: req.params.id,
      },
    }
  )

  res.render('update-success', { id: req.params.id })
}

const login = async (req, res) => {
  res.render('login')
}

const loginHandler = async (req, res) => {
  const body = req.body

  if ((req, body.username === 'admin' && req.body.password === 'admin')) {
    res.redirect('/players')
  }

  res.render('login')
}

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayerForm,
  createPlayer,
  deletePlayer,
  updatePlayerForm,
  updatePlayer,
  login,
  loginHandler,
}
