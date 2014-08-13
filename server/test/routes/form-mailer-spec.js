require('../../test/helper.js');
var request = require('supertest');
replay.mode = 'record';

describe('form-mailer', function() {
  it('should be successful', function(done) {
    var fields = {
      replyName: 'John Smith',
         replyEmail: 'john.smith@example.net',
         'crds-form-subject': 'Yo!',
         'crds-form-to': '326568'
    };
    request(crdsApp).post('/form-mail').send(fields).expect(200, done);
  });
});
