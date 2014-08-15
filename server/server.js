var express = require('express'),
    path = require('path'),
    logger = require('./logger'),
    PORT = config.get('PORT') ? config.get('PORT') : 8000;

app = express();

require('./middleware')(app);
require('./routes')(app);

app.listen(PORT);

logger.info('Express listening on port ' + PORT);

module.exports.crdsApp = app;
