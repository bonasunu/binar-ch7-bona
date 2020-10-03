const express = require('express')
const app = express()
const apiPlayersRoute = require('./routes/apiPlayers')
const middleware = require('./utils/middleware')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiPlayersRoute)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
