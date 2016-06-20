var express = require('express');
var session = require('express-session');
var router = express.Router();
require('../conf/admin-passport-config');
var passport = require('passport');
var debug = require('debug')('comment-system:admin-route');
var loginCtrl = require('../controllers/login.js');

router.use(passport.initialize());
// router.use(session({secret: 'my secret'}));
// router.use(passport.session({secret: 'my secret'}));
// router.use('/api/**', passport.authenticate('jwt', { session: false}));
router.get('/', function(req, res) {
  res.render('admin/index', {title: 'Administration', appname: 'admin'});
})
router.get('/login', function(req, res) {
  res.render('admin/login', {title: 'Login', appname:'admin'});
});
// router.use()
router.post('/login', loginCtrl.login);

module.exports = router;
