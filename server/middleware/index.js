var app, apiProxy, bodyParser, express, session, passport, RedisStore, refreshToken, cookieParser;

apiProxy = require('./api-proxy');
express = require('express');
passport = require('passport');
cookieParser = require('cookie-parser');
session = require('express-session');
RedisStore = require('connect-redis')(session);
refreshToken = require('./refresh-token');

module.exports = function(app) {
  app.use(cookieParser());
  app.use(session({
    store: new RedisStore({ url: process.env.REDISCLOUD_URL }),
    key: "crossroads.sid",
    secret: 'secret',
    cookie: { path: '/', httpOnly: true, maxAge: null },
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(refreshToken());
  app.use('/api', apiProxy('https://my.crossroads.net/'));
  app.use(express.static(__dirname + "/../../generated"));
  if (process.env.NODE_ENV === 'development') {
    app.use(express.static(__dirname + "/../../.tmp"));
    app.use(express.static(__dirname + "/../../vendor"));
  }
};
