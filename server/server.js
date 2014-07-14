var app, dotenv, express, passport;

express = require('express');
bodyParser = require('body-parser');
expressValidator = require('express-validator');

app = express();
app.use(bodyParser());
app.use(expressValidator([]));

require('./middleware')(app);

require('./routes')(app);

app.listen(process.env.PORT || 8000);

module.exports.crdsApp = app;
