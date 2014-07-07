cp = require 'child_process'
args = require('yargs').argv
nn = require 'node-notifier'
notifier = new nn()
browserSync = require 'browser-sync'
n = args.n

if args.burp
  yamlConfigString = "_config.yml,config/_config.dev.yml,config/_config.exclude.yml"
else
  yamlConfigString = "_config.yml,config/_config.dev.yml"

module.exports = (gulp, devEnv, $) ->
  gulp.task "jekyll", (cb) ->
    bundle = cp.spawn("bundle", [
      "exec"
      "jekyll"
      "build"
      "--config"
      yamlConfigString
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
