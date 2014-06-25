module.exports = (gulp) ->
  gulp.task "test", [
    "clean"
    "sass"
    "karma"
    "spec-watch"
  ]
