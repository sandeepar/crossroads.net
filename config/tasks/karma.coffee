karma = require('karma').server
_ = require 'lodash'
karmaConf = require '../karma.conf'

module.exports = (gulp) ->
  gulp.task "karma", ["coffee"], (done) ->
    karma.start _.assign({}, karmaConf,
      singleRun: true
    ), done
