const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.message === 'NoPermission') {
    return res
      .status(403)
      .json({ error: 'You are not authorized to access this page' })
  } else {
    return res.json({ error: error.message })
  }

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }
