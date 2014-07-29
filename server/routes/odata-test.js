var util = require('util');
var q = require('q');
var request = require('superagent');
var auth = require('../util/auth');
var $data = require('jaydata');

module.exports = function(app) {
    app.route('/odata-test')
        .get(function(req, res, next) {
            console.log("oData Test");

            auth.getToken('drye', 'danrye11')
                .then(function(token) {
                    console.log("Got auth token");
                    getContact(token);

                    res.send(200, "Done");
                }, function(error) {
                    console.log("Auth token error");
                    res.send(500, "Error");
                })
                .done();
        });

    var getContact = function(token) {
        $data.initService('https://my.crossroads.net/ministryplatformapi/DataService.svc')
            .then(function(context) {
                console.log("Initialized context, querying Contact");
                context.prepareRequest = function(request) {
                    console.log("Prepare request");
                    request[0].headers['Authorization'] = 'Bearer ' + token.access_token;
                    //request[0].headers['Accept'] = 'application/json, text/plain, */*';

                    console.log("DIRECT REQUEST\nXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n", util.inspect(request));
                };

                var contactPromise = context.Contacts.single(function(contact) {
                    return contact.Contact_ID === '302796';
                });

                contactPromise.then(function(contact) {
                    console.log('something: ', contact);
                    console.log('first name: ', contact.First_Name);
                    console.log('last name: ', contact.Last_Name);
                    console.log('contact id: ', contact.Contact_ID);
                    console.log('email: ', contact.Email_Address);

                    saveContact(token, context, contact);
                });
            },
            function(error) {
                console.log("Jaydata init error");
            });
    };

    var saveContact = function(token, context, contact) {
        console.log("Attempting contact save");

        context.prepareRequest = function(request) {
            console.log("Prepare request for save");
            request[0].headers['Authorization'] = 'Bearer ' + token.access_token;
            request[0].headers['Accept'] = 'application/atomsvc+xml;q=0.8, application/json;odata=fullmetadata;q=0.7, application/json;q=0.5, */*;q=0.1';
            request[0].headers['Content-Type'] = 'application/json;odata=verbose';

            console.log("DIRECT REQUEST\nXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n", util.inspect(request));
        };

        context.Contacts.attach(contact);
        contact['Email_Address'] = 'test@fancy.net';

        savePromise = context.saveChanges();
        savePromise.then(function (data) {
            console.log("Saved ", data);
        }, function (error) {
            console.log("Error ", error);
        });
    };
};