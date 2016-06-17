const debug = require('debug')('comment-system:referrer');
const url = require('url');
var Referrer = require('../models/referrer');
debug('Initializing referrer middleware');
Referrer.count({}, function(err, count) {
  if (!err) {
    if (count == 0) {
      debug('No referrers created. Adding localhost.');
      var localhost = new Referrer({hostname: 'localhost'});
      localhost.save();
    }
  }
});

function validateReferrer(req, res, next) {
  var referrer = req.get('Referrer');
  debug(`Referrer: ${referrer}`);
  var refUrl = url.parse(referrer);
  debug(`Referrer hostname: ${refUrl.hostname}`);
  Referrer.count({hostname: refUrl.hostname}, function(err, count) {
    if (err) {
      debug('could not validate referrer');
      res.status(500).send(err);
    } else {
      if (count > 0) {
        debug('Referrer OK');
        next();
      } else {
        debug('Referrer NOT ALLOWED');
        res.status(403).send({message: 'Referrer not allowed'});
      }
    }
  });
}

module.exports = validateReferrer;
