var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../conf/config');
var debug = require('debug')('comment-system:login-controller');

function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  debug(`Logging in with ${username}:${password}`);

  User.findByUsername(username, function(err, user) {
    if (err) {
      res.status(500).send({message: 'Error querying DB'});
    } else if (!user) {
      res.status(404).send({message: 'User not found'});
    } else {
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          res.status(500).send({message: 'Error querying DB'});

        } else if (!isMatch) {
          res.status(401).send({message: 'Invalid password'});
        } else {
          var profile = {
            name: user.name,
            username: user.username
          };

          var token = jwt.sign(profile, config.jwt_secret, {expiresIn: 60*5});
          res.send({token: token});
        }
      });
    }
  });
}

module.exports = {
  login: login
};
