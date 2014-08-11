spawn = require('child_process').spawn
protractor = require("gulp-protractor").protractor

module.exports = (gulp, $) ->
  gulp.task 'protractor', ["webdriver_update", "jekyll_ci"], ->
    server = spawn('node', ['server/server.js'])
    server.stdout.on 'data', (data) ->
      console.log '[ci server] ', data.toString()
    gulp.src("spec/integration/**/*_spec.js")
      .pipe(protractor
        configFile: "config/protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
      ).on 'end', ->
        server.kill('SIGTERM')
