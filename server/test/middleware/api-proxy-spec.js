var apiProxy = require('../../middleware/api-proxy'),
    assert = require('assert');

describe('api-proxy', function() {
  var uri = 'http://google.com';

  it('should accept a uri argument', function() {
    assert.ok(apiProxy(uri));
  });

  it('should throw an error if the argument is blank', function() {
    assert.throws(function() {
      apiProxy();
    });
  });
});
