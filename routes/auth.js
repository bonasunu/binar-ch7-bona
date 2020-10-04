const Router = require('express-promise-router')
const router = new Router()
const controller = require('../controllers/authController')
const restrict = require('../utils/restrict')

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/', controller.homepage)
router.get('/whoami', restrict, controller.whoAmI)

module.exports = router
