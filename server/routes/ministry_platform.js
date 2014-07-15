module.exports = function(app) {

  var oauth = require('../oauth/index.js');

  var util = require('util');
  var q = require('q');
  var request = require('superagent');

  var ministryPlatformBaseUrl = 'https://my.crossroads.net/ministryplatformapi/PlatformService.svc/';
  var getPageLookupRecordsUrl = ministryPlatformBaseUrl + 'GetPageLookupRecords';
  var getPageRecordUrl = ministryPlatformBaseUrl + 'GetPageRecord';
  var updatePageRecordUrl = ministryPlatformBaseUrl + 'UpdatePageRecord';

  //
  // Express Route for Contact - Get Page Record
  //
  app.route('/getContact/:recordId')
    .get(function(req, res) {
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
  // Express Route for Get Page Lookup Records for Marital Status
  //
  app.route('/getMaritalStatus')
    .get(function(req, res) {
      var promise = lookupValues(339);
      promise
        .then(function(data) {
          // var values = formatValues(data.Data);
          res.send(data.Data);

        }, function(err) {
          console.log('Error returning lookup values for Marital Status');
        })
        .done();

    });

  //
  // Express Route for Get Page Lookup Records for Gender
  //
  app.route('/getGenders')
    .get(function(req, res) {
      var promise = lookupValues(311);
      promise
        .then(function(data) {
          // var values = formatValues(data.Data);
          res.send(data.Data);

        }, function(err) {
          console.log('Error returning lookup values for gender');
        })
        .done();

    });

  var getContactPage = function(recordId) {
    var deferred = q.defer();
    oauth.getTokenForService()
      .then(function(token) {
        request
          .get(getPageRecordUrl)
          .query({
            pageId: 292,
            recordId: recordId
          })
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
    oauth.getTokenForService()
      .then(function(token) {
        request
          .get(getPageLookupRecordsUrl)
          .query({
            pageId: pageId
          })
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
};
