cp = require 'child_process'
args = require('yargs').argv
nn = require 'node-notifier'
notifier = new nn()
browserSync = require 'browser-sync'
n = args.n
sync = args.sync
yamlConfigString = "_config.yml,config/_config.dev.yml"
fs = require('fs')
if fs.existsSync("config/_config.local.yml")
  yamlConfigString += ",config/_config.local.yml"
if args.burp
  yamlConfigString += ",config/_config.exclude.yml"

module.exports = (gulp, devEnv, $) ->
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
      if sync then browserSync.reload() else $.util.noop()
      if not n and data.toString().search('done.') != -1
        notifier.notify(title: "Gulp", message: 'Jekyll is done')
      return
    return
