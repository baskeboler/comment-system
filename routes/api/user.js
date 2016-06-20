var express = require('express'),
router = express.Router();
var debug = require('debug')('comment-system:user-api-route');
var userController = require('../../controllers/user');
var passport = require('passport');
router.param('username', function(req, res, next, username) {
  debug(`captured username=${username}`);
  req.username=username;
  next();
});
router.use(passport.authenticate('jwt', { session: false}));
router.get('/', userController.query);
router.post('/', userController.create);
router.route('/:username')
  .get(userController.get)
  .delete(userController.remove);


module.exports = router;
