browserSync = require 'browser-sync'
args = require('yargs').argv

sync = args.sync

module.exports = (gulp, $) ->
  gulp.task "server", ->
    $.nodemon
      script: "./server/server.js"
      env: if sync then {'PORT': 8000} else {'PORT': 3000}
      ignore: [
        "app/"
        "_site/"
        "config/"
        "generated/"
        "spec/"
        "tmp/"
        "vendor/"
      ]
    browserSync.init(null, proxy: "localhost:8000") if sync
    return
