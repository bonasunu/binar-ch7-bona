const Router = require('express-promise-router')
const router = new Router()
const controller = require('../controllers/apiController')

router.get('/players', controller.getAllPlayers)
router.get('/players/:id', controller.getPlayerById)
router.post('/players/create', controller.createPlayer)
router.delete('/players/delete/:id', controller.deletePlayer)
router.put('/players/update/:id', controller.updatePlayer)

module.exports = router
