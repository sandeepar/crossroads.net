protractor = require("gulp-protractor").protractor

module.exports = (gulp, $) ->
  gulp.task 'protractor', ["webdriver_update"], (cb) ->
    gulp.src("spec/integration/**/*.js")
      .pipe(protractor
        configFile: "config/protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:3000']
      )
