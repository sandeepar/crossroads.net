assert = require 'assert'
request = require 'supertest'
app = require('../../server.js').crdsApp
replay = require 'replay'
replay.mode = 'replay'

describe "/login", ->
  it "with valid credentials", (done) ->
    creds = { username: 'drye', password: 'danrye11' }
    request(app)
      .post '/login'
      .send creds
      .expect 'Content-Type', /plain/
      .expect 200
      .end (err, res) ->
        assert.equal res.text, 'OK'
        done()

  it "with invalid credentials", (done) ->
    creds = { username: 'fred', password: 'flintstone' }
    request(app)
      .post '/login'
      .send creds
      .expect 'Content-Type', /plain/
      .expect 403
      .end (err, res) ->
        assert.equal res.text, 'Forbidden'
        done()

  it "without credentials", (done) ->
    request(app)
      .post '/login'
      .expect 'Content-Type', /plain/
      .expect 403
      .end (err, res) ->
        assert.equal res.text, 'Forbidden'
        done()
