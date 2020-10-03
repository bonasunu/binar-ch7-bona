const Router = require('express-promise-router')
const router = new Router()
const controller = require('../controllers/authController')

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router