var mandrill = require('mandrill-api/mandrill');
var util = require('util');

module.exports = function(app) {
   // var mandrillApiKey = "c84f6RI_NE-LKsA3n3EB4g";    // Crossroads.net API key
    var mandrillApiKey = "Ng3po8yK9LlryPGwXorM5Q";  // personal test API key

    app.route('/form-handlers')
        .post(function(req, res, next) {
            // This field should be empty in the form
            // If a BOT has auto-filled this form trying to use the form for Spam,
            // do not send an email but reply as usual
            var honeypot = req.param('crds-form-authorization-signature');
            if (!honeypot) {
                var fromNameField = req.param('crds-form-from-name') || 'FromName';
                var fromEmailField = req.param('crds-form-from-email') || 'FromAddress';

                // Validate the form inputs
                // TODO:  How to redirect and report on form errors
                req.assert('crds-form-subject', 'Form subject is required').notEmpty();
                req.assert('crds-form-to', 'Form to address is required').notEmpty();
                req.assert(fromEmailField, 'From email required').notEmpty();
                req.assert(fromEmailField, 'Valid from email required').isEmail();

                // Check for configured required field
                var required = req.param('require');
                for (var requiredKey in required) {
                    console.log('Required key: ' + requiredKey);
                    if (required.hasOwnProperty(requiredKey)) {
                        req.sanitize(requiredKey).trim();

                        console.log('Testing for key: ' + requiredKey + ' against value "' + req.param(requiredKey) + '"');
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

                var fromName = req.param(fromNameField) || 'None Provided';
                var fromEmail = req.param(fromEmailField) || null;

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
                for (var i=0; i<keyList.length; i++) {
                    content += keyList[i] + "\n";
                    content += req.body[keyList[i]] + "\n\n";
                }

                // Send the email using Mandrill
                send(toList, fromEmail, fromName, subject, content);
            } else {
                console.log('BOT submitted request');
            }

            // Redirect to a success page
            res.redirect(redirect || '/contact-submitted');
        });

    var send = function(toList, fromEmail, fromName, subject, content) {
        var mandrill_client = new mandrill.Mandrill(mandrillApiKey);

        var toArray = [];
        toList.forEach(function(email) {
            toArray.push({
                "email": email,
                "type": "to"
            });
        });

        var message = {
           // "html": "<p>Example HTML content</p>",
            "text": content || 'No Form Data Submitted',
            "subject": subject,
            "from_email": fromEmail,
            "from_name": fromName,
            "to": toArray,
            "headers": {
                "Reply-To": "message.reply@example.com"
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
//            "bcc_address": "message.bcc_address@example.com",
            "tracking_domain": null,
            "signing_domain": null,
            "return_path_domain": null,
//            "merge": true,
//            "global_merge_vars": [{
//                "name": "merge1",
//                "content": "merge1 content"
//            }],
//            "merge_vars": [{
//                "rcpt": "recipient.email@example.com",
//                "vars": [{
//                    "name": "merge2",
//                    "content": "merge2 content"
//                }]
//            }],
//            "tags": [
//                "password-resets"
//            ],
//            "metadata": {
//                "website": "www.example.com"
//            },
//            "recipient_metadata": [{
//                "rcpt": "recipient.email@example.com",
//                "values": {
//                    "user_id": 123456
//                }
//            }],
//            "attachments": [{
//                "type": "text/plain",
//                "name": "myfile.txt",
//                "content": "ZXhhbXBsZSBmaWxl"
//            }],
//            "images": [{
//                "type": "image/png",
//                "name": "IMAGECID",
//                "content": "ZXhhbXBsZSBmaWxl"
//            }]
        };
        var async = false;
        var ip_pool = "Main Pool";
        mandrill_client.messages.send({"message": message, "async": async }, function(result) {
            console.log(result);
            /*
             [{
             "email": "recipient.email@example.com",
             "status": "sent",
             "reject_reason": "hard-bounce",
             "_id": "abc123abc123abc123abc123abc123"
             }]
             */
        }, function(e) {
            // Mandrill returns the error as an object with name and message keys
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
            // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        });
    }
};
