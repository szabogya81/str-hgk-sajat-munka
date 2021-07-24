const httpError = require('http-errors')
const logger = require('./logger')

const logAndShowError = (next, err, statusCode) => {
  const status = statusCode || err.statusCode || 500
  logger.error(`${err.message}, stack: ${err.stack}`)
  next(httpError(status, 'Error occored during process'))
}

module.exports = Object.freeze({ logAndShowError })
