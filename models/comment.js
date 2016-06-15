var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  page: String,
  author: String,
  title: String,
  body: String,
  remoteIp: String,
  date: Date
});

module.exports = mongoose.model('Comment', CommentSchema);
