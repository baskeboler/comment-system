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
router.get('/', getPostsForPage);

function getPostsForPage(req, res) {

}

function handlePost(req, res) {
    CommentCtrl.save(req)
        .then(function(comment) {
            res.send(comment);
        })
        .catch(function(err) {
            res.status(500).send({
                    message: 'Error creating comment'
                }

            );
        });
}
module.exports = router;
