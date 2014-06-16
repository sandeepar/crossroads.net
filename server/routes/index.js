var mandrill = require('mandrill-api/mandrill');

module.exports = function(app) {
//    var mandrillUser = 'cradmin@crossroads.net';
//    var mandrillPass = 'L0rd&Savi0r';
   // var mandrillApiKey = "c84f6RI_NE-LKsA3n3EB4g";    // Crossroads.net API key
    var mandrillApiKey = "Ng3po8yK9LlryPGwXorM5Q";  // personal test API key

    app.route('/form-handlers')
        .post(function(req, res, next) {

            console.log('Form Handler');

            var honeypot = req.param('crossroads-authorization-signature');
            if (honeypot) {
                console.log('BOT submitted request');
            }

            var subject = req.param('crossroads-subject') || 'Contact Email Submission';
            send('chris@tallented.com', subject);


            var redirect = req.param('crossroads-redirect');
            res.redirect(redirect || '/contact-submitted');
        });

    var send = function(to, subject) {
        var mandrill_client = new mandrill.Mandrill(mandrillApiKey);
        var message = {
            "html": "<p>Example HTML content</p>",
            "text": "Example text content",
            "subject": subject,
            "from_email": "message.from_email@example.com",
            "from_name": "Example Name",
            "to": [{
                "email": to,
                "name": "Recipient Name",
                "type": "to"
            }],
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
