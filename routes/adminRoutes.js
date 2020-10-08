const Router = require('express-promise-router')
const router = new Router()
const controller = require('../controllers/adminController')

router.get('/login', controller.adminLogin)
router.post('/login', controller.authenticateAdmin)
router.get('/players', controller.getAllPlayers)
router.get('/hello', controller.hello)

module.exports = router
