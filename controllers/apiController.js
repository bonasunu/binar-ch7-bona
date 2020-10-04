const db = require('../db/models')

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
  getAllPlayers,
  getAllRooms,
}
