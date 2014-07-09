module.exports = (gulp) ->
  gulp.task "build", [
    "clean"
    "coffee"
    "sass"
    "html"
    "icons"
    "imagemin"
    "jb"
  ]
