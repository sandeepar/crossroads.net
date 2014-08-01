var config = require('../config')
var mandrill = require('mandrill-api/mandrill');
var util = require('util');
var q = require('q');
var request = require('superagent');
var auth = require('../util/auth');

module.exports = function(app) {
  //
  // Configuration Settings
  //
  var contactUrl = 'https://my.crossroads.net/ministryplatformapi/PlatformService.svc/GetPageRecord';
  var contactPageId = 292;

  var mandrillApiKey = config.get('MANDRILL_API_KEY');    // Crossroads.net API key
  var fromEmail = "notifications@crossroads.net";
  var fromName = "Notifications";

  //
  // Express Route for Form Processing
  //
  app.route('/form-mail')
    .post(function (req, res, next) {
      // This field should be empty in the form
      // If a BOT has auto-filled this form trying to use the form for Spam,
      // do not send an email but reply as usual
      var honeypot = req.param('crds-form-authorization-signature');
      if (!honeypot) {
        var replyNameField = req.param('crds-form-reply-name') || 'replayName';
        var replyEmailField = req.param('crds-form-reply-email') || 'replyEmail';

        // Validate the form inputs
        // TODO:  How to redirect and report on form errors
        req.assert('crds-form-subject', 'Form subject is required').notEmpty();
        req.assert('crds-form-to', 'Form to address is required').notEmpty();
        req.assert(replyEmailField, 'Reply email required').notEmpty();
        req.assert(replyEmailField, 'Valid Reply email required').isEmail();

        // Check for configured required field
        var required = req.param('crds-form-require');
        for (var requiredKey in required) {
          if (required.hasOwnProperty(requiredKey)) {
            req.sanitize(requiredKey).trim();
            req.assert(requiredKey, 'Missing required field: ' + requiredKey).notEmpty();
          }
        }

        var errors = req.validationErrors();
        if (errors) {
          res.send('There have been validation errors: ' + util.inspect(errors), 400);
          return;
        }

        // Extract the form parameters
        var subject = req.param('crds-form-subject');
        var redirect = req.param('crds-form-redirect');

        var replyName = req.param(replyNameField) || 'None Provided';
        var replyEmail = req.param(replyEmailField) || null;

        var toParam = req.param('crds-form-to');
        var toList = toParam ? toParam.trim().split(/\s*,\s*/) : [];

        // Build the email content with all form params and values
        var keyList = [];
        for (var key in req.body) {
          if (req.body.hasOwnProperty(key) && key.search(/^crds-form-/) === -1) {
            keyList.push(key);
          }
        }

        keyList.sort();

        var content = '';
        for (var i = 0; i < keyList.length; i++) {
          content += "<p><b>" + keyList[i] + "</b><br/>\n";
          content += req.body[keyList[i]] + "</p>\n";
        }

        // Lookup the TO Contact(s) in Ministry Platform
        var promise = lookupContacts(toList);
        promise
          .then(function(emails) {
            console.log('Retrieved email addresses: ' + emails);

            // Send the email using Mandrill
            send(emails, replyEmail, replyName, subject, content);
          }, function(err) {
            console.log('Error looking up email addresses for contact ids: ' + toList);
          })
          .done();
      } else {
        console.log('BOT submitted request');
      }

      // Redirect to a success page
      if (redirect) {
        res.redirect(redirect);
      } else {
        res.status(200).end();
      }
    });

  //
  // Lookup Contacts in Ministry Platform
  //
  var lookupContacts = function(toList) {
    var promises = [];
    var emails = [];

    toList.forEach(function(recordId) {
      promises.push(lookupContact(recordId));
    });

    return q.all(promises);
  };

  var lookupContact = function(recordId) {
    var deferred = q.defer();
    auth.getToken('form-mailer-service', 'password')
      .then(function(token) {
        request
          .get(contactUrl)
          .query({ pageId: contactPageId, recordId: recordId })
          .set('Authorization', 'Bearer ' + token.access_token)
          .end(function(err, res) {
            if (err || res.error) {
              console.log('Contact Lookup Error: ' + util.inspect(err || res.error));
              return;
            }

            var email = extractFieldValue(res.body, 'Email_Address');
            deferred.resolve(email);
          });
      }, function(error) {
        deferred.reject(error);
      })
      .done();

    return deferred.promise;
  };

  var extractFieldValue = function(res, fieldName) {
    if (res.Fields && res.Data && res.Data[0]) {
      for (var i=0; i < res.Fields.length; i++) {
        if (res.Fields[i].Name === fieldName) {
          return res.Data[0][res.Fields[i].Index];
        }
      }
    }

    return null;
  };

  //
  // Send Email through Mandrill
  //
  var send = function (toList, replyEmail, replyName, subject, content) {
    var mandrill_client = new mandrill.Mandrill(mandrillApiKey);

    var toArray = [];
    toList.forEach(function (email) {
      if (email && email.trim()) {
        toArray.push({
          "email": email.trim(),
          "type": "to"
        });
      }
    });

    var replyTo = replyName && replyName.length ? replyName + " <" + replyEmail + ">" : replyEmail;

    var templateName = "primary";
    var templateContent = [
      {
        "name" : "main",
        "content": content || 'No Form Data'
      }
    ];

    var message = {
      // "html": "<p>Example HTML content</p>",
      //"text": content || 'No Form Data Submitted',
      "subject": subject,
      "from_email": fromEmail,
      "from_name": fromName,
      "to": toArray,
      "headers": {
        "Reply-To": replyTo
      },
      "important": false,
      "track_opens": null,
      "track_clicks": null,
      "auto_text": null,
      "auto_html": null,
      "inline_css": null,
      "url_strip_qs": null,
      "preserve_recipients": null,
      "view_content_link": null,
      "tracking_domain": null,
      "signing_domain": null,
      "return_path_domain": null
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.sendTemplate({
      "template_name" : templateName,
      "template_content" : templateContent,
      "message": message,
      "async": async
    }, function (result) {
      console.log(result);
      /*
       [{
       "email": "recipient.email@example.com",
       "status": "sent",
       "reject_reason": "hard-bounce",
       "_id": "abc123abc123abc123abc123abc123"
       }]
       */
    }, function (e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
  };
};
