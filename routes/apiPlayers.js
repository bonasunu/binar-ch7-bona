const Router = require('express-promise-router')
const router = new Router()
const controller = require('../controllers/apiController')

router.get('/', controller.homepage)
router.get('/players', controller.getAllPlayers)
router.get('/rooms', controller.getAllRooms)

module.exports = router
