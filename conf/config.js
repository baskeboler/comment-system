var mongoose = require('mongoose');
var debug = require('debug')('comment-system:config');

// Use q. Note that you **must** use `require('q').Promise`.
mongoose.Promise = require('q').Promise;
// assert.ok(query.exec() instanceof require('q').makePromise);
var mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1/comment-system';
// var db = mongoose.createConnection(mongoUri);
mongoose.connect(mongoUri).then(function(){
  debug('Successfully connected to MongoDB');
});
// mongoose.on('error', console.error.bind(console, 'connection error:'));

var conf = {
  captcha_secret: '6LfWoyITAAAAAKcMNl59Uq4CcR0a0XsWNNtUxNes',
  captcha_verify_url: 'https://www.google.com/recaptcha/api/siteverify',
  mongoUri: mongoUri,
  jwt_secret: 'jwt secret'
};

module.exports = conf;
