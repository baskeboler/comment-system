const http = require('http');
const https = require('https');
const url = require('url');
const debug = require('debug')('comment-system:captcha');
const querystring = require('querystring');

const appConfig = require('../conf/config');


const verifyUrl = url.parse(appConfig.captcha_verify_url);
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

        if (verifyResponse.statusCode != 200) {
            res.status(403).send({
                message: 'Captcha Failed'
            });
        } else {
            debug(`Captcha succeeded!`)
            next();
        }
    });
    verifyRequest.on('error', (e) => {
        debug('Error validating captcha');
        debug(`${e}`);
        res.status(500).send({
            message: 'Error validating captcha'
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