clean = require 'gulp-clean'

module.exports = (gulp) ->
  gulp.task "clean", ->
    gulp.src("generated/{js,css}/*.*").pipe clean()
    return
