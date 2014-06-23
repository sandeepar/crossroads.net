cp = require 'child_process'

module.exports = (gulp) ->
  gulp.task "mkdirs", ->
    cp.exec "mkdir -p generated/js"
    cp.exec "mkdir -p generated/css"
    return
