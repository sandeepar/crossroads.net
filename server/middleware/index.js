var app, apiProxy, bodyParser, express, session, passport, RedisStore, refreshToken, cookieParser;

apiProxy = require('./api-proxy');
express = require('express');
bodyParser = require('body-parser');
passport = require('passport');
cookieParser = require('cookie-parser');
session = require('express-session');
RedisStore = require('connect-redis')(session);
refreshToken = require('./refresh-token');

module.exports = function(app) {
    app.use(bodyParser());
    app.use(cookieParser());
    app.use(session({
        store: new RedisStore({ url: process.env.REDISCLOUD_URL }),
        key: "crossroads.sid",
        secret: 'secret',
        cookie: { path: '/', httpOnly: true, maxAge: null }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(refreshToken());
    app.use('/api', apiProxy('https://my.crossroads.net/'));
    return app.use(express["static"]("" + __dirname + "/../../generated"));
};
