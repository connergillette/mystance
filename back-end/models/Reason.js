var mongoose = require("mongoose");

module.exports = mongoose.model('Reason', {
	text: String,
	count: Number
});
