cp = require 'child_process'
nn = require 'node-notifier'
notifier = new nn()
browserSync = require 'browser-sync'
fs = require('fs')

module.exports = (gulp, opts, $) ->
  yamlConfigString = "_config.yml,config/_config.dev.yml"

  if fs.existsSync("config/_config.local.yml")
    yamlConfigString += ",config/_config.local.yml"
  if opts.burp
    yamlConfigString += ",config/_config.exclude.yml"

  gulp.task "jekyll", (cb) ->
    bundle = cp.spawn("bundle", [
      "exec"
      "jekyll"
      "build"
      "--config"
      yamlConfigString
      "--watch"
      "--verbose"
    ])
    bundle.on "close", cb
    bundle.stdout.on "data", (data) ->
      console.log "[jekyll] ", data.toString()
      if opts.sync then browserSync.reload() else $.util.noop()
      if not opts.n and data.toString().search('done.') != -1
        notifier.notify(title: "Gulp", message: 'Jekyll is done')
      return
    return
