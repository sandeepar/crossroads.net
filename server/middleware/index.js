var apiProxy, bodyParser, express;

bodyParser = require('body-parser');

apiProxy = require('./api-proxy');

express = require('express');
var passport = require('passport');

module.exports = function(app) {
    app.use('/api', apiProxy('https://my.crossroads.net/ministryplatform'));
    app.use(bodyParser());
    app.use(passport.initialize());
    app.use(passport.session());
    return app.use(express["static"]("" + __dirname + "/../../generated"));
};
