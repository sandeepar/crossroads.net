require('dotenv').load();

module.exports = {
  get: function(key, defaultValue) {
    if (!process.env.hasOwnProperty(key)) {
      if (defaultValue) {
        return defaultValue;
      } else {
        throw "Configuration has no property " + key;
      }
    }

    return process.env[key];
  }
};
