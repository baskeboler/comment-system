const debug = require('debug')('comment-system:comments-controller');
var Comment = require('../models/comment');
const Q = require('q');

function createComment(req) {
  var comment = new Comment({
    page: req.body.page,
    author: req.body.author,
    title: req.body.title,
    body: req.body.body,
    remoteIp: req.ip,
    date: new Date()
  });
  var deferred = Q.defer();
  comment.save().then(function(savedComment) {
    debug(`Comment saved successfully: ${JSON.stringify(savedComment)}`);
    deferred.resolve( savedComment);
  }).catch(function(error) {
    debug('Error saving comment');
    deferred.reject(error);
  });
  return deferred.promise;
}

function getCommentsForPage(page) {
  var deferred = Q.defer();
  Comment.find({page: page}, function(err, docs) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(docs);
    }
  });
  return deferred.promise;
}

function all() {
  var deferred = Q.defer();
  Comment.find({}, function(err, docs) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(docs);
    }
  });
  return deferred.promise;
}

module.exports = {
  save: createComment,
  all: all
};
