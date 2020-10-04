const db = require('../db/models')
const { v4: uuidv4 } = require('uuid')

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

const createRoom = async (req, res) => {
  const room = await db.Room.create({
    id: uuidv4(),
    creator: req.user.id,
    name: req.body.name,
  })
  res.json({ room: room.id })
}

module.exports = {
  getAllPlayers,
  getAllRooms,
  createRoom,
}
