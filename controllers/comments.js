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
        deferred.resolve(savedComment);
    }).catch(function(error) {
        debug('Error saving comment');
        deferred.reject(error);
    });
    return deferred.promise;
}

function getCommentsForPage(page) {
    var deferred = Q.defer();
    Comment.find({
        page: page
    }, null, {
        sort: {
            date: -1
        }
    }, function(err, docs) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}
function deleteComment(id) {
  var deferred = Q.defer();
  debug(`deleting comment id=${id}`);
  Comment.findById(id, function(err, comment) {
    if (err) {
      deferred.reject(err);
    } else {
      debug(`found id ${id}`);
      comment.remove(function(err2, comment2) {
        if (err2) {
          deferred.reject(err2);
        } else {
          deferred.resolve(comment2);
        }
      });
    }
  });
  return deferred.promise;
}
function all() {
    var deferred = Q.defer();
    Comment.find({}, null, {
            sort: {
                date: -1
            }
        },
        function(err, docs) {
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
    all: all,
    pageComments: getCommentsForPage,
    delete: deleteComment
};
