var express = require('express'),
    router = express.Router();
var debug = require('debug')('comment-system:referrer-api-route');
var referrerController = require('../../controllers/referrer');
var passport = require('passport');
router.param('referrerId', function(req, res, next, referrerId) {
    debug(`captured referrerId=${referrerId}`);
    req.referrerId = referrerId;
    next();
});

router.use(passport.authenticate('jwt', { session: false}));
router.get('/', referrerController.query);
router.post('/', referrerController.create);
router.route('/:referrerId')
    .get(referrerController.get)
    .delete(referrerController.remove);


module.exports = router;
