module.exports = (gulp) ->
  gulp.task "dev", [
    "clean"
    "coffee"
    "sass"
    "icons"
    "jekyll"
    "server"
    "watch"
  ]
