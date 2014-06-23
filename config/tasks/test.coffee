module.exports = (gulp) ->
  gulp.task "test", [
    "clean"
    "mkdirs"
    "sass"
    "vendor"
    "karma"
    "spec-watch"
  ]
