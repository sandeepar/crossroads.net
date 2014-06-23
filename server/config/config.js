dotenv = require('dotenv');
dotenv.load();

module.exports = {
  api: {
    url: process.env.API_URL
  }
};
