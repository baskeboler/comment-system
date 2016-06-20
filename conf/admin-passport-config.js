var passport = require('passport'),
    Q = require('q'),
    config = require('./config'),
    // LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    debug = require('debug')('comment-system:admin-passport-config'),
    mongoose = require('mongoose');
mongoose.connection.on('open', bootstrap);

function bootstrap() {
    debug('Configuring passport');
    var user = new User({name: 'Admin', username: 'admin', 'password': 'admin'});
    user.save();
}
//
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         debug('Executing local strategy callback');
//         debug(`${username}:${password}`);
//         User.findByUsername(username).then(function( user) {
//             debug('in findByUsername');
//             if (!user) {
//                 debug('incorrect username');
//                 return done(null, false, {
//                     message: 'Incorrect username.'
//                 });
//             }
//             debug(`user found`);
//             user.comparePassword(password, function(err2, isMatch) {
//                 if (err2) {
//                     debug('there was an error querying the db');
//                     return done(err2);
//                 }
//                 if (!isMatch) {
//                     debug('incorrect password');
//                     return done(null, false, {
//                         message: 'Incorrect password.'
//                     });
//                 } else {
//                     debug('password valid');
//                     return done(null, user);
//                 }
//             });
//         });
//     }
// ));
// passport.serializeUser(function(user, done) {
//     console.log('serializeUser: ' + user._id)
//     done(null, user._id);
// });
//
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user){
//         console.log(user)
//         if(!err) done(null, user);
//         else done(err, null)
//     })
// });

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.jwt_secret;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findByUsername(jwt_payload.username, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));
module.exports = passport;
