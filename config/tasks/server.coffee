nodemon = require 'gulp-nodemon'
livereload = require 'gulp-livereload'

module.exports = (gulp) ->
  gulp.task "server", ->
    nodemon
      script: "./server/server.js"
      ignore: [
        "app/"
        "_site/"
        "config/"
        "generated/"
        "spec/"
        "tmp/"
        "vendor/"
      ]
    livereload.listen()
    return
