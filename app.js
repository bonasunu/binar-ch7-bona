const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const playersRoute = require('./routes/players')
const apiPlayersRoute = require('./routes/apiPlayers')
const middleware = require('./utils/middleware')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', playersRoute)
app.use('/api', apiPlayersRoute)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
