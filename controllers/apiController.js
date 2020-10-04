const db = require('../db/models')

const homepage = async (req, res) => res.json({ info: 'Homepage' })

const getAllPlayers = async (req, res) => {
  const players = await db.Player.findAll({
    include: [db.Room],
  })
  res.json({ players })
}

const getAllRooms = async (req, res) => {
  const rooms = await db.Room.findAll({
    include: [db.Log],
  })
  res.json({ rooms })
}

module.exports = {
  homepage,
  getAllPlayers,
  getAllRooms,
}
