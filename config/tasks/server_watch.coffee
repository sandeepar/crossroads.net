module.exports = (gulp) ->
  gulp.task 'server_watch', ->
    gulp.watch 'server/**/*', ['mocha']
