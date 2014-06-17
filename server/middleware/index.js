var apiProxy, express;

apiProxy = require('./api-proxy');

express = require('express');

module.exports = function(app) {
    app.use('/api', apiProxy('https://my.crossroads.net/ministryplatform'));
    return app.use(express["static"]("" + __dirname + "/../../generated"));
};
