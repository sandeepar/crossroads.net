module.exports = (gulp) ->
  gulp.task "build", [
    "clean"
    "coffee"
    "sass"
    "imagemin"
    "html"
    "jb"
  ]
