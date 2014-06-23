module.exports = (gulp) ->
  gulp.task "dev", [
    "clean"
    "vendor"
    "coffee"
    "sass"
    "jekyll"
    "server"
    "watch"
  ]
