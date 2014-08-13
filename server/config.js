require('dotenv').load();

module.exports = {
  get: function(key) {
    if (!process.env.hasOwnProperty(key)) {
      throw "Configuration has no property " + key;
    }

    return process.env[key];
  }
};
