devEnv = process.env.NODE_ENV == 'development'
gulp = require 'gulp'
templateCache = require 'gulp-angular-templatecache'
coffeelint = require 'gulp-coffeelint'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
sass = require 'gulp-ruby-sass'
concat = require 'gulp-concat'
nodemon = require 'gulp-nodemon'
clean = require 'gulp-clean'
streamqueue = require 'streamqueue'
karma = require('karma').server
_ = require 'lodash'
gulpif = require 'gulp-if'
ngmin = require 'gulp-ngmin'
uglify = require 'gulp-uglify'
minifyCSS = require 'gulp-minify-css'
cp = require 'child_process'
livereload = require 'gulp-livereload'
paths = require './config/paths'
karmaConf = require './config/karma_conf'
vendor = require './config/files'

gulp.task "clean", ->
  gulp.src("generated/{js,css}/*.*").pipe clean()
  return

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
    return
  return

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

gulp.task "mkdirs", ->
  cp.exec "mkdir -p generated/js"
  cp.exec "mkdir -p generated/css"
  return

gulp.task "vendor", ->
  gulp.src(vendor.js)
    .pipe(concat("vendor.js"))
    .pipe(gulpif(not devEnv, ngmin()))
    .pipe gulp.dest("generated/js")

gulp.task "coffee", ->
  streamqueue(
    objectMode: true
  , gulp.src(paths.scripts)
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffee({bare: true}).on("error", gutil.log))
  , gulp.src(paths.templates)
    .pipe(templateCache(standalone: true)))
    .pipe(concat("app.js"))
    .pipe(gulpif(not devEnv, ngmin()))
    .pipe(gulpif(not devEnv, uglify()))
    .pipe(gulp.dest("generated/js"))
    .pipe gulpif(devEnv, livereload())

gulp.task "sass", ->
  gulp.src("app/css/main.scss")
    .pipe(sass(sourcemap: false))
    .pipe(concat("app.css"))
    .pipe(gulpif(not devEnv, minifyCSS()))
    .pipe(gulp.dest("generated/css"))
    .pipe gulpif(devEnv, livereload())
  return

gulp.task "server", ->
  nodemon
    script: "./server/server.js"
    ignore: [
      "app/"
      "_site/"
      "config/"
      "generated/"
      "spec/"
      "tmp/"
      "vendor/"
    ]
  livereload.listen()
  return

gulp.task "karma", ["coffee"], (done) ->
  karma.start _.assign({}, karmaConf,
    singleRun: true
  ), done

gulp.task "watch", ->
  gulp.watch [
    paths.scripts
    paths.templates
  ], ["coffee"]
  gulp.watch paths.sass, ["sass"]
  return

gulp.task "spec-watch", ->
  gulp.watch [
    paths.specs
    paths.scripts
    paths.templates
  ], [
    "coffee"
    "karma"
  ]
  return

gulp.task "test", [
  "clean"
  "mkdirs"
  "sass"
  "vendor"
  "karma"
  "spec-watch"
]
gulp.task "ci", [
  "clean"
  "vendor"
  "karma"
]
gulp.task "dev", [
  "clean"
  "vendor"
  "coffee"
  "sass"
  "jekyll"
  "server"
  "watch"
]
gulp.task "build", [
  "clean"
  "jb"
  "vendor"
  "coffee"
  "sass"
]
gulp.task "default", ["dev"]
