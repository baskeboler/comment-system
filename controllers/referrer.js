var debug = require('debug')('comment-system:referrer-controller');
var Referrer = require('../models/referrer');
var Q = require('q');

function create(req, res) {
  var referrer = new Referrer(req.body);
  referrer.save(function(err, savedReferrer) {
    if (err) {
      return res.status(500).send({message: 'Error saving referrer', error: err});
    } else {
      return res.send(savedReferrer);
    }
  });
}

function all(req, res) {
    Referrer.find({}, function(err, referrers) {
        if (err) {
            return res.status(500).send({
                message: 'Error querying DB',
                error: err
            });
        } else {
            return res.send(referrers);
        }
    });
}

function get(req, res) {
    Referrer.findById(req.referrerId, function(err, referrer) {
        if (err) {
            return res.status(500).send({
                message: 'Error querying DB',
                error: err
            });
        } else if (!referrer) {
            return res.status(404).send(null);
        } else {
            return res.send(referrer);
        }
    });
}

function remove(req, res) {
    Referrer.findById(req.referrerId, function(err, referrer) {
        if (err) {
            return res.status(500).send({
                message: 'Error querying DB',
                error: err
            });
        } else if (!referrer) {
            return res.status(404).send(null);
        } else {
            referrer.remove(function(err) {
                if (err) {
                    return res.status(500).send({
                        mesage: 'Error deleting in db'
                    });
                } else {
                    return res.send({
                        message: 'referrer deleted.'
                    });
                }
            });
        }
    });
}

module.exports = {
  create: create,
  get: get,
  query: all,
  remove: remove
};
