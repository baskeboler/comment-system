var mongoose = require('mongoose');
const debug = require('debug')('comment-system:config');
mongoose.connect('mongodb://127.0.0.1/comment-system');
mongoose.connection.on('open', function(){
  debug('Successfully connected to MongoDB');
})
var conf = {
  captcha_secret: '6LfWoyITAAAAAKcMNl59Uq4CcR0a0XsWNNtUxNes',
  captcha_verify_url: 'https://www.google.com/recaptcha/api/siteverify'
};

module.exports = conf;
