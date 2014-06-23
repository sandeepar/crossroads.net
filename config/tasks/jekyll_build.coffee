cp = require 'child_process'

module.exports = (gulp) ->
  gulp.task "jb", (cb) ->
    bundle = cp.spawn("bundle", [
      "exec"
      "jekyll"
      "build"
      "--config"
      "_config.yml,config/_config.ci.yml"
    ])
    bundle.on "close", cb
    bundle.stdout.on "data", (data) ->
      console.log "[jekyll] ", data.toString()
      return
    return
