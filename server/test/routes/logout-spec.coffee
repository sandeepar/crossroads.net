require('../../test/helper.js')
request = require('supertest')

describe "/logout", ->
  it "logs the user out", (done) ->
    request(crdsApp)
      .delete "/logout"
      .expect 204, done
