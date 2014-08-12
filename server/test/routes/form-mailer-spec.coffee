require('../../test/helper.js')
request = require('supertest')
replay.mode = 'record'

describe 'form-mailer', ->
  it 'should be successful', (done) ->
    fields =
      replyName: 'John Smith'
      replyEmail: 'john.smith@example.net'
      'crds-form-subject': 'Yo!'
      'crds-form-to': '326568'

    request(crdsApp)
      .post '/form-mail'
      .send fields
      .expect 200, done
