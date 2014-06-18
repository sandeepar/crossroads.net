var http, https, url;

http = require("http");

https = require("https");

url = require("url");
var util = require('util');

module.exports = function(uri) {
    if (typeof uri === "string") {
        uri = url.parse(uri);
    }
    if (uri.pathname === '/') {
        uri.pathname = '';
    }
    return function(req, res, next) {
        var cb, headers, options, protocol, proxyRequest;
        req.pause();
        headers = req.headers;
        delete headers.host;
        delete headers.connection;
        headers["X-Api-Root-Path"] = "/api";
        headers["X-Forwarded-For"] = (req.ips ? req.ips.join(",") : req.ip);
        if (req.user != null) {
          headers["Authorization"] = "Bearer " + req.user.token.access_token;
        }
        headers["Content-Length"] = req.get('content-length') || 0;
        options = {
            hostname: uri.hostname,
            port: uri.port,
            method: req.method,
            headers: headers,
            path: uri.pathname + req.url
        };
        cb = function(proxyResponse) {
            proxyResponse.pause();
            res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
            proxyResponse.pipe(res);
            return proxyResponse.resume();
        };
        protocol = uri.protocol === "https:" ? https : http;
        proxyRequest = protocol.request(options, cb);
        proxyRequest.on("error", function(err) {
            return next(err);
        });
        req.pipe(proxyRequest);
        return req.resume();
    };
};
