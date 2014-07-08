module.exports = (gulp) ->
  gulp.task "ci", [
    "clean"
    "karma"
    "protractor"
  ]
