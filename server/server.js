var app, dotenv, express;

express = require('express');

dotenv = require('dotenv');

dotenv.load();

app = express();

require('./middleware')(app);

require('./routes')(app);

app.listen(process.env.PORT || 3000);
