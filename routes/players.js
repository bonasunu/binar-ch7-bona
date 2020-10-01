const Router = require('express-promise-router')
const router = new Router()
const controller = require('../controllers/playersController')

router.get('/players', controller.getAllPlayers)
router.get('/players/:id', controller.getPlayerById)
router.post('/players/create', controller.createPlayer)
router.get('/create-player', controller.createPlayerForm)
router.get('/players/delete/:id', controller.deletePlayer)
router.post('/players/update/:id', controller.updatePlayer)
router.get('/players/update-player/:id', controller.updatePlayerForm)
router.get('/', controller.login)
router.post('/login', controller.loginHandler)

module.exports = router
