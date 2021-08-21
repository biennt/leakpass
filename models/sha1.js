var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sha1Schema = new Schema({
	hashpass: String,
	count: Number
});

module.exports = mongoose.model('sha1', sha1Schema);
