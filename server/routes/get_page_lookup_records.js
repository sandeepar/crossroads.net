module.exports = function(app) {
    var util = require('util');
    var q = require('q');
    var request = require('superagent');

    //
    // OAuth2 Support for Ministry Platform calls
    //
    var credentials = {
        clientID: 'client',
        clientSecret: 'secret',
        site: 'https://my.crossroads.net/ministryplatform',
        authorizationPath: '/oauth/authorize',
        tokenPath: '/oauth/token'
    };

    var OAuth2 = require('simple-oauth2')(credentials);

    var getPageLookupRecordsUrl = 'https://my.crossroads.net/ministryplatformapi/PlatformService.svc/GetPageLookupRecords';
    var getPageRecordUrl = 'https://my.crossroads.net/ministryplatformapi/PlatformService.svc/GetPageRecord';

    //
    // Express Route for Contact - Get Page Record
    //
    app.route('/getContact/:recordId')
      .get(function (req, res) {
        var promise = getContactPage(req.params.recordId);
        promise
            .then(function(data) {
              res.send(data);

            }, function(err) {
                console.log('Error returning page record for recordId = ' + req.parms.recordId);
            })
            .done();

      });

    //
    // Express Route for Get Page Lookup Records
    //
    app.route('/pagelookup/:pageId')
      .get(function (req, res) {
        var promise = lookupValues(req.params.pageId);
        promise
            .then(function(data) {
              var values = formatValues(data.Data);
              res.send(values);

            }, function(err) {
                console.log('Error returning lookup values for pageId = ' + req.parms.pageId);
            })
            .done();

      });

    //
    // Express Route for Get Page Lookup Records for Gender
    //
    app.route('/getGenders')
      .get(function (req, res) {
        var promise = lookupValues(311);
        promise
            .then(function(data) {
              var values = formatValues(data.Data);
              res.send(values);

            }, function(err) {
                console.log('Error returning lookup values for gender');
            })
            .done();

      });

    //
    // Express Route for Get Page Lookup Records for Marital Status
    //
    app.route('/getMaritalStatus')
      .get(function (req, res) {
        var promise = lookupValues(339);
        promise
            .then(function(data) {
              var values = formatValues(data.Data);
              res.send(values);

            }, function(err) {
                console.log('Error returning lookup values for Marital Status');
            })
            .done();

      });

    var getContactPage = function(recordId) {
      var deferred = q.defer();
      getTokenForService()
          .then(function(token) {
              request
                  .get(getPageRecordUrl)
                  .query({ pageId: 292, recordId: recordId })
                  .set('Authorization', 'Bearer ' + token.access_token)
                  .end(function(err, res) {
                      if (err || res.error) {
                          console.log('Contact Lookup Error: ' + util.inspect(err || res.error));
                          return;
                      }
                      deferred.resolve(res.body);
                  });
          }, function(error) {
              deferred.reject(error);
          })
          .done();

      return deferred.promise;
    };

    var lookupValues = function(pageId) {
      var deferred = q.defer();
      getTokenForService()
          .then(function(token) {
              request
                  .get(getPageLookupRecordsUrl)
                  .query({ pageId: pageId })
                  .set('Authorization', 'Bearer ' + token.access_token)
                  .end(function(err, res) {
                      if (err || res.error) {
                          console.log('Retrieve Lookup Values Error: ' + util.inspect(err || res.error));
                          return;
                      }
                      deferred.resolve(res.body);
                  });
          }, function(error) {
              deferred.reject(error);
          })
          .done();

      return deferred.promise;
    };

    var formatValues = function(data) {
      var output = [];
      for (var i = 0; i < data.length; i++) {
          var element = {id: data[i][0],value: data[i][1]};
          output.push(element);
      }
      return output;
    };

    //
    // Create Token for server-to-server API calls
    //
    var getTokenForService = function() {
        var deferred = q.defer();
        OAuth2.Password.getToken({
                username: 'form-mailer-service',
                password: 'password'
            }, function(error, result) {
            if (error) {
                console.log('OAuth error: ' + util.inspect(error));
                deferred.reject(error);
                return;
            }

            //console.log('Access token: ' + util.inspect(result));
            deferred.resolve(result);
        });

        return deferred.promise;
    };

};
