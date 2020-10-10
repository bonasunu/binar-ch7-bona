const db = require('../db/models')
const { v4: uuidv4 } = require('uuid')
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
  const room = await db.Room.findOne({where: {id: room_id}, include: [db.Log]})
  if (!room) res.status(404).json({info: "Room doesn't exist. Please create new room first."})

  let activeLog = room['Logs'].filter(i => i.is_active === true)

  // TODO Create helper to deactivate session
  
  // check if room exist, then check active log
  //find a log, if log doesn't exist, then create it
  // if log, check empty session. if full, choose another room
  // find open session
  // play with 2 players
  // set is_active false if error happen
  
  if (room && activeLog.length === 0) {
    const newLog = await db.Log.create({
      log_id: uuidv4(),
      room_id: room_id,
      winner: [],
      session: [req.user.id],
      is_active: true,
      playing_date: new Date()
    })
    activeLog.concat(newLog)
    res.json({info: 'You joined this room'})
  } else if (room && activeLog[0].session.length < 2) {
    // add player
    // if duplicate player, return error
    // if full, return error
    // else, success
    const duplicateUser = await activeLog[0].session.some(i => i === req.user.id)
    if (duplicateUser) res.status(202).json({info: 'You are in the room right now.'})
    else if (!duplicateUser) {
      const session = activeLog[0].session.concat(req.user.id)

      await db.Log.update({
        session: session
      }, {
        where: {
          log_id: activeLog[0].log_id
        }
      })

      activeLog[0].session = session
      res.json({info: 'You joined this room'})
    }
  } else if (room && activeLog[0].session.length === 2) {
    const duplicateUser = await activeLog[0].session.some(i => i === req.user.id)
    if (duplicateUser) res.status(202).json({info: 'You are in the room right now.'})
    else res.status(404).json({info: "Room is full. Please join other room or create new room."})
  } else res.status(404).json({info: "Room is full. Please join other room or create new room."})
  
}

const playGame = async (req, res) => {
  // TODO
  // create route for player selection
  // wait reponse for all players, if all players respond then go to next round, else session ended
  // show the result of each round
  // show the winner
  // finish
}

module.exports = {
  getAllPlayers,
  getAllRooms,
  createRoom,
  fightRoom,
  playGame
}
