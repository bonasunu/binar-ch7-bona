const db = require('../db/models')
const { v4: uuidv4 } = require('uuid')
const ac = require('../lib/roles')
const cache = require('memory-cache')

const getAllPlayers = async (req, res) => {
  const permission = await ac.can(req.user.role).readAny('players')
  if (!permission.granted) throw new Error('NoPermission')

  const players = await db.Player.findAll({
    include: [db.Room],
    where: {
      role: 'player',
    },
  })
  res.json({ players })
}

const getAllRooms = async (req, res) => {
  const permission = await ac.can(req.user.role).readAny('rooms')
  if (!permission.granted) throw new Error('NoPermission')

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
  res.status(201).json({ room: room.id })
}

const fightRoom = async (req, res) => {
  const room_id = req.params.room
  const room = await db.Room.findOne({
    where: { id: room_id },
    include: [db.Log],
  })
  if (!room)
    res
      .status(404)
      .json({ info: "Room doesn't exist. Please create new room first." })

  let activeLog = await db.Log.findOne({
    where: {
      room_id: room_id,
    },
  })

  if (room && !activeLog) {
    await db.Log.create({
      log_id: uuidv4(),
      room_id: room_id,
      winner: [],
      session: [req.user.id],
      is_active: true,
      playing_date: new Date(),
    })
    cache.put(req.params.room, [])
    res.json({ info: 'You joined this room' })
  } else if (room && activeLog.session.length < 2) {
    const duplicateUser = await activeLog.session.some((i) => i === req.user.id)
    if (duplicateUser)
      res.status(202).json({ info: 'You are in the room right now.' })
    else if (!duplicateUser) {
      const session = activeLog.session.concat(req.user.id)

      await db.Log.update(
        {
          session: session,
        },
        {
          where: {
            log_id: activeLog.log_id,
          },
        }
      )

      res.json({ info: 'You joined this room' })
    }
  } else if (room && activeLog.session.length === 2) {
    const duplicateUser = await activeLog.session.some((i) => i === req.user.id)
    if (duplicateUser)
      res.status(202).json({ info: 'You are in the room right now.' })
    else
      res.status(404).json({
        info: 'Room is full. Please join other room or create new room.',
      })
  } else
    res.status(404).json({
      info: 'Room is full. Please join other room or create new room.',
    })
}

const playGame = async (req, res) => {
  const log = await db.Log.findOne({
    where: {
      room_id: req.params.room,
      is_active: true,
    },
  })

  const player = log.session.includes(req.user.id)
  if (!player)
    throw new Error(
      'You are not registered to this room. Please join another room.'
    )

  let game = cache.get(req.params.room)
  if (game.length < 2) {
    const player = req.user.id
    game.push({
      player: player,
      option: req.body.option,
    })
    cache.put(req.params.room, game)
  }

  res.json(game)
}

const showResult = async (res, req) => {
  // get cache
  // compare the inputs
  // showResult (each round and the winner)
}

module.exports = {
  getAllPlayers,
  getAllRooms,
  createRoom,
  fightRoom,
  playGame,
  showResult,
}
