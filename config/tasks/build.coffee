module.exports = (gulp) ->
  gulp.task "build", [
    "clean"
    "jb"
    "vendor"
    "angular"
    "coffee"
    "sass"
  ]
