var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../conf/config');

var ReferrerSchema = new Schema({
  hostname: String
});

module.exports = mongoose.model('Referrer', ReferrerSchema);
