module.exports = (gulp) ->
  gulp.task "dev", [
    "clean"
    "vendor"
    "angular"
    "coffee"
    "sass"
    "jekyll"
    "server"
    "watch"
  ]
