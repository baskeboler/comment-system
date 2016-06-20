var http = require('http');
var https = require('https');
var url = require('url');
var debug = require('debug')('comment-system:captcha');
var querystring = require('querystring');

var appConfig = require('../conf/config');


var verifyUrl = url.parse(appConfig.captcha_verify_url);
debug(`loading captcha verify url`);
debug(`protocol: ${verifyUrl.protocol}`);
debug(`hostname: ${verifyUrl.hostname}`);
debug(`port: ${verifyUrl.port}`);
debug(`path: ${verifyUrl.path}`);

var checkCaptchaData = function(req, res, next) {
    var postData = querystring.stringify({
        secret: appConfig.captcha_secret,
        response: req.body['g-recaptcha-response'],
        remoteIp: req.ip
    });
    var verifyRequest = https.request(createHttpOptions(req, postData), (verifyResponse) => {
        var responseData = '';
        if (verifyResponse.statusCode != 200) {
            res.status(403).send({
                message: 'Captcha Failed'
            });
        }
        debug(`status code: ${res.statusCode}`);
        debug(`headers: ${JSON.stringify(res.headers)}`);
        verifyResponse.on('error', (e) => {
            debug('Error validating captcha');
            debug(`${e}`);
            res.status(500).send({
                message: 'Error validating captcha'
            });
        });
        verifyResponse.on('data', (chunk) => {
            responseData += chunk;
            debug(`chunk: ${chunk}`);
        });
        verifyResponse.on('end', () => {
            debug(`response complete`);
            var obj = JSON.parse(responseData);
            if (obj.success)
                next();
            else {
                res.status(500).send({
                    message: 'Captcha failed',
                    captchaObject: obj
                });
            }
        });
    });

    debug(`Sending post data ${postData}`);
    verifyRequest.write(postData);
    verifyRequest.end();
    debug(`Waiting for a response`);
};

function createHttpOptions(req, postData) {
    return {
        hostname: verifyUrl.hostname,
        port: verifyUrl.port || verifyUrl.protocol == 'http:' ? 80 : 443,
        path: verifyUrl.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
}
module.exports = checkCaptchaData;
