cp = require 'child_process'
livereload = require 'gulp-livereload'
args = require('yargs').argv

n = args.n

module.exports = (gulp, notifier, devEnv) ->
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
      livereload.changed "jekyll"

      if devEnv and not n and data.toString().search('done.') != -1
        notifier.notify({ title: "Gulp", message: 'Jekyll is done' })

      return
    return
