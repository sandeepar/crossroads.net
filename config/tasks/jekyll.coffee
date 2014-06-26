cp = require 'child_process'
args = require('yargs').argv
browserSync = require 'browser-sync'
n = args.n

module.exports = (gulp, notifier, devEnv, $) ->
  gulp.task "jekyll", (cb) ->
    bundle = cp.spawn("bundle", [
      "exec"
      "jekyll"
      "build"
      "--config"
      "_config.yml,config/_config.dev.yml"
      "--watch"
    ])
    bundle.on "close", cb
    bundle.stdout.on "data", (data) ->
      console.log "[jekyll] ", data.toString()
      if devEnv then browserSync.reload() else $.util.noop()
      if not n and data.toString().search('done.') != -1
        notifier.notify(title: "Gulp", message: 'Jekyll is done')
      return
    return
