sass = require 'gulp-ruby-sass'
concat = require 'gulp-concat'
minifyCSS = require 'gulp-minify-css'
vendor = require '../files'
gulpif = require 'gulp-if'
livereload = require 'gulp-livereload'
args = require('yargs').argv

n = args.n

module.exports = (gulp, notify, devEnv) ->
  gulp.task "sass", ->
    gulp.src(vendor.css.concat [ "app/css/main.scss"])
      .pipe(sass(sourcemap: false))
      .pipe(concat("app.css"))
      .pipe(gulpif(not devEnv, minifyCSS()))
      .pipe(gulp.dest("generated/css"))
      .pipe gulpif(devEnv, livereload())
      .pipe(gulpif(devEnv and not n, notify('Sass is done')))
    return
