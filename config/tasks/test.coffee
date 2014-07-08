module.exports = (gulp) ->
  gulp.task "test", [
    "clean"
    "sass"
    "karma"
    "protractor"
    "spec-watch"
  ]
