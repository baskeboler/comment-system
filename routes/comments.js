const debug = require('debug')('comment-system:comments-route');
var express = require('express');
var router = express.Router();
var validateCaptcha = require('../middleware/captcha');
var CommentCtrl = require('../controllers/comments');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('comments', {
        title: 'Comments'
    });
});
router.post('/', validateCaptcha, handlePost);

function handlePost(req, res) {
    CommentCtrl.save(req, function(err, comment) {
        if (err) {
            return res.status(500).send({
                message: 'Error creating comment'
            });
        }
        return res.send(comment);
    });
}

module.exports = router;
