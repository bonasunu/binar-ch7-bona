const { v4: uuidv4 } = require('uuid')
const db = require('../db/models')

const getAllPlayers = async (req, res) => {
  const players = await db.Player.findAll({
    include: [db.PlayerBio, db.PlayerHistory],
  })
  res.json({ players })
}

const getPlayerById = async (req, res) => {
  const player = await db.Player.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.PlayerBio, db.PlayerHistory],
  })
  res.json({ player })
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
          uid: uuid,
        },
      ],
    },
    {
      include: [db.PlayerBio, db.PlayerHistory],
    }
  )

  res.json({ status: 'Created' })
}

const deletePlayer = async (req, res) => {
  await db.Player.destroy({
    where: {
      id: req.params.id,
    },
  })

  res.json({ status: 'Deleted' })
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

  res.json({ ok: 'Updated' })
}

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  deletePlayer,
  updatePlayer,
}
