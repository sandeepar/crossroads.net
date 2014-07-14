apiProxy = require '../../middleware/api-proxy'
assert = require 'assert'

describe 'api-proxy', ->
  uri = 'http://google.com'

  it 'should accept a uri argument', ->
    assert.ok apiProxy(uri)

  it 'should throw an error if the argument is blank', ->
    assert.throws ->
       apiProxy()
