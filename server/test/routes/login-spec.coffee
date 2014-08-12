require('../../test/helper.js')
request = require('supertest')

describe "/login", ->
  it "with valid credentials", (done) ->
    creds = { username: 'drye', password: 'danrye11' }
    request(crdsApp)
      .post '/login'
      .send creds
      .expect 'Content-Type', /plain/
      .expect 200
      .end (err, res) ->
        assert.equal res.text, 'OK'
        done()

  it "with invalid credentials", (done) ->
    creds = { username: 'fred', password: 'flintstone' }
    request(crdsApp)
      .post '/login'
      .send creds
      .expect 'Content-Type', /plain/
      .expect 403
      .end (err, res) ->
        assert.equal res.text, 'Forbidden'
        done()

  it "without credentials", (done) ->
    request(crdsApp)
      .post '/login'
      .expect 'Content-Type', /plain/
      .expect 403
      .end (err, res) ->
        assert.equal res.text, 'Forbidden'
        done()
