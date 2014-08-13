require('../../test/helper.js');
var request = require('supertest');

describe("/login", function() {
  it("with valid credentials", function(done) {
    var creds = {
      username: 'drye',
    password: 'danrye11'
    };

    request(crdsApp).post('/login').send(creds).expect('Content-Type', /plain/).expect(200).end(function(err, res) {
      assert.equal(res.text, 'OK');
      done();
    });
  });

  it("with invalid credentials", function(done) {
    var creds = {
      username: 'fred',
    password: 'flintstone'
    };

    request(crdsApp).post('/login').send(creds).expect('Content-Type', /plain/).expect(403).end(function(err, res) {
      assert.equal(res.text, 'Forbidden');
      done();
    });
  });

  it("without credentials", function(done) {
    request(crdsApp).post('/login').expect('Content-Type', /plain/).expect(403).end(function(err, res) {
      assert.equal(res.text, 'Forbidden');
      done();
    });
  });
});
