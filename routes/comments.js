const debug = require('debug')('comment-system:comments-route');
var Q = require('q');
var _ = require('lodash');
var dateFormat = require('dateformat');
var express = require('express');
var router = express.Router();
var validateCaptcha = require('../middleware/captcha');
var validateReferrer = require('../middleware/referrer');
var CommentCtrl = require('../controllers/comments');

/* GET home page. */
router.param('pageId', function(req, res, next, pageId) {
    debug(`captured pageID=${pageId}`);
    req.pageId = pageId;
    next();
});
router.get('/form', function(req, res, next) {
    Q.when(CommentCtrl.pageComments('testing-site/comments'), function(comments) {
        debug('Promise fullfilled, mapping results');
        var commentCollection = _.map(comments, function(c) {
            debug(`mapping ${JSON.stringify(c)}`);
            var obj = {
                title: c.title,
                author: c.author,
                date: dateFormat(c.date, 'dddd, mmmm dS, yyyy, h:MM:ss TT'),
                body: c.body
            };
            // return {
            //     title: c.title,
            //     body: c.body,
            //     date: dateformat(c.date)
            // };
            return obj;
        });
        debug('Results mapped');
        res.render('comments', {
            title: 'Comments',
            comments: commentCollection
        });
    }, function() {
        res.render('comments', {
            title: 'Comments',
            comments: []
        });
    });
});
router.use(validateReferrer);
router.post('/', validateCaptcha, handlePost);
router.get('/page/:pageId/comments', handleGetByPage);
router.get('/', all);

function handleGetByPage(req, res) {
    CommentCtrl.pageComments(req.pageId)
        .then(function(comments) {
            res.send(comments);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
}

function all(req, res) {
    CommentCtrl.all()
        .then(function(comments) {
            res.send(comments);
        })
        .catch(function(err) {
            res.status(500).send(err);
        })
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
