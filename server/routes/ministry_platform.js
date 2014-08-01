var auth = require('../auth'),
    username = 'form-mailer-service',
    password = 'password';

module.exports = function(app) {
  app.route('/getContact/:recordId').get(function(req, res) {
    getContactPage(req.params.recordId).then(function(data) {
      res.send(data);
    }, function(err) {
      console.log('Error returning page record for recordId = ' + req.parms.recordId);
    }).done();
  });

  app.route('/getMaritalStatus').get(function(req, res) {
    lookupValues(339).then(function(data) {
      res.send(data);
    }, function(err) {
      console.log('Error returning lookup values for Marital Status');
    }).done();
  });

  app.route('/getGenders').get(function(req, res) {
    lookupValues(311).then(function(data) {
      res.send(data.Data);
    }, function(err) {
      console.log('Error returning lookup values for gender');
    }).done();
  });

  var getContactPage = function(recordId) {
    auth.getToken(username, password).then(function(token) {
      var thinkMinistry = require('think-ministry')(token);

      return thinkMinistry.get('GetPageRecord', { pageId: 292, recordId: recordId })
    }, function(error) {
      console.log('Contact Lookup Error: ' + util.inspect(err || res.error));
    });
  };

  var lookupValues = function(pageId) {
    auth.getToken(username, password).then(function(token) {
      var thinkMinistry = require('think-ministry')(token);

      return thinkMinistry.get('GetPageLookupRecords', { pageId: pageId })
    }, function(error) {
      console.log('Retrieve Lookup Values Error: ' + util.inspect(err || res.error));
    });
  }
};
