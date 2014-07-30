assert = require 'assert'
request = require 'supertest'
app = require('../../server.js').crdsApp
replay = require 'replay'
replay.mode = 'record'

describe 'form-mailer', ->
  it 'should be successful', (done) ->
    fields =
      replyName: 'John Smith'
      replyEmail: 'john.smith@example.net'
      'crds-form-subject': 'Yo!'
      'crds-form-to': '326568'

    request(app)
      .post '/form-mail'
      .send fields
      .expect 200, done
