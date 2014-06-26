module.exports = (gulp) ->
  gulp.task "build", [
    "clean"
    "jb"
    "coffee"
    "sass"
    "imagemin"
    "html"
  ]
