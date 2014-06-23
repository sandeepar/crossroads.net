module.exports = (gulp) ->
  gulp.task "build", [
    "clean"
    "jb"
    "vendor"
    "coffee"
    "sass"
  ]
