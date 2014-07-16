dotenv = require('dotenv');
dotenv.load();

module.exports = {
  api: {
    url: process.env.API_URL
  },
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  }
};
