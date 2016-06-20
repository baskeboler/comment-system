var debug = require('debug')('comment-system:user-controller');
var User = require('../models/user');
var Q = require('q');

function create(req, res) {
  var user = new User(req.body);
  user.save(function(err, savedUser) {
    if (err) {
      return res.status(500).send({message: 'Error saving user', error: err});
    } else {
      return res.send(savedUser);
    }
  });
}

function all(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            return res.status(500).send({
                message: 'Error querying DB',
                error: err
            });
        } else {
            return res.send(users);
        }
    });
}

function get(req, res) {
    User.findByUsername(req.username, function(err, user) {
        if (err) {
            return res.status(500).send({
                message: 'Error querying DB',
                error: err
            });
        } else if (!user) {
            return res.status(404).send(null);
        } else {
            return res.send(user);
        }
    });
}

function remove(req, res) {
    User.findByUsername(req.username, function(err, user) {
        if (err) {
            return res.status(500).send({
                message: 'Error querying DB',
                error: err
            });
        } else if (!user) {
            return res.status(404).send(null);
        } else {
            user.remove(function(err) {
                if (err) {
                    return res.status(500).send({
                        mesage: 'Error deleting in db'
                    });
                } else {
                    return res.send({
                        message: 'user deleted.'
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
}
