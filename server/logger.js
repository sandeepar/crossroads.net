var winston = require('winston')
    config  = require('./config')
    env     = config.get('NODE_ENV', 'development')
    level   = config.get('LOG_LEVEL', 'info');

function Logger() {
  return winston.add(winston.transports.File, {
    filename: 'server/log/' + env + '.log',
    timestamp: true,
    json: false,
    level: level
  });
}

module.exports = new Logger();
