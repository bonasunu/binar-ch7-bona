const Router = require('express-promise-router')
const router = new Router()
const controller = require('../controllers/apiController')
const restrict = require('../utils/restrict')

router.get('/players', controller.getAllPlayers)
router.get('/rooms', controller.getAllRooms)
router.post('/create-room', restrict, controller.createRoom)

module.exports = router
