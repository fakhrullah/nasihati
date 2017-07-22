var winston = require('winston')

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true
    }),
    new (winston.transports.File)({
      name: 'info-file',
      filename: './logs/info.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: './logs/error.log',
      level: 'error'
    })
  ]
})

/**
 * Shortcuts
 */
logger.e = logger.error
logger.w = logger.warn
logger.i = logger.info
logger.v = logger.verbose
logger.d = logger.debug
logger.s = logger.silly

module.exports = logger
