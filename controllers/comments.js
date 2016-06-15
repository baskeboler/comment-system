const debug = require('debug')('comment-system:comments-controller');
var Comment = require('../models/comment');

function createComment(req, callback) {
  var comment = new Comment({
    page: req.body.page,
    author: req.body.author,
    title: req.body.title,
    body: req.body.body,
    remoteIp: req.ip,
    date: new Date()
  });
  comment.save().then(function(savedComment) {
    debug(`Comment saved successfully: ${JSON.stringify(savedComment)}`);
    callback(null, savedComment);
  }).catch(function(error) {
    debug('Error saving comment');
    callback(error);
  });
}

module.exports = {
  save: createComment
};
