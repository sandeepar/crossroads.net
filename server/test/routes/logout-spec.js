require('../../test/helper.js');
var request = require('supertest');

describe("/logout", function() {
  it("logs the user out", function(done) {
    request(crdsApp)["delete"]("/logout").expect(204, done);
  });
});
