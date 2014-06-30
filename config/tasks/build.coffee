module.exports = (gulp) ->
  gulp.task "build", [
    "clean"
    "coffee"
    "sass"
    "html"
    "imagemin"
    "jb"
  ]
