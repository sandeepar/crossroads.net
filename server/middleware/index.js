var app, apiProxy, bodyParser, express, session, passport, RedisStore, refreshToken, cookieParser;

apiProxy = require('./api-proxy');
express = require('express');
bodyParser = require('body-parser');
passport = require('passport');
cookieParser = require('cookie-parser');
session = require('express-session');
RedisStore = require('connect-redis')(session);
refreshToken = require('./refresh-token');
path = require('path');
sessionStore = new RedisStore({
  url: process.env.REDISCLOUD_URL
});
sessionStore.on('disconnect', function() {
  console.log('Could not connect to redis/got disconnected.');
  process.exit(1);
});

var ThinkMinistry = require('think-ministry'),
    thinkMinistryProxy = require('think-ministry/middleware');

ThinkMinistry.baseUrl = 'https://my.crossroads.net/ministryplatformapi/PlatformService.svc/'

module.exports = function(app) {
  app.enable('trust proxy');

  app.use(cookieParser());
  app.use(session({
    store: sessionStore,
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
  app.use('/api2', thinkMinistryProxy({
    accessToken: function(req) {
      return req.user && req.user.token && req.user.token.access_token
    }
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator([]));

  app.use(express.static(path.resolve(__dirname + '/../../generated')));

  if (process.env.NODE_ENV === 'development') {
    app.use(express.static(__dirname + "/../../.tmp"));
    app.use(express.static(__dirname + "/../../vendor"));
  }
};
