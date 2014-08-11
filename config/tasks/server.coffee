browserSync = require 'browser-sync'

module.exports = (gulp, opts, $) ->
  gulp.task "server", ->
    $.nodemon
      script: "./server/server.js"
      env: if opts.sync then {'PORT': 8000} else {'PORT': 3000}
      ignore: [
        "app/"
        "_site/"
        "config/"
        "generated/"
        "spec/"
        "tmp/"
        "vendor/"
      ]
    browserSync.init(null, proxy: "localhost:8000") if opts.sync
    return
