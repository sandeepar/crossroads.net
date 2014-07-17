assert = require 'assert'
request = require 'supertest'
app = require('../../server.js').crdsApp
replay = require 'replay'
replay.mode = 'record'

describe "/logout", ->
  it "logs the user out", (done) ->
    request(app)
      .delete "/logout"
      .expect 204, done
