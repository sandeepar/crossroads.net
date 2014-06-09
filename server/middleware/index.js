var apiProxy, bodyParser, express;

bodyParser = require('body-parser');

apiProxy = require('./api-proxy');

express = require('express');

module.exports = function(app) {
    app.use('/api', apiProxy('https://my.crossroads.net/ministryplatform'));
    app.use(bodyParser());
    return app.use(express["static"]("" + __dirname + "/../../generated"));
};
