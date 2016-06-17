var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReferrerSchema = new Schema({
  hostname: String
});

module.exports = mongoose.model('Referrer', ReferrerSchema);
