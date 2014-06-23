module.exports = (gulp) ->
  gulp.task "ci", [
    "clean"
    "vendor"
    "karma"
  ]
