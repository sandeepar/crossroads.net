module.exports = (gulp) ->
  gulp.task "dev", [
    "clean"
    "coffee"
    "sass"
    "jekyll"
    "server"
    "watch"
  ]
