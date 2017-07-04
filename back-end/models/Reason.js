var mongoose = require("mongoose");

module.exports = mongoose.model('Reason', {
	text: String, // e.g. 'The 2nd amendment says so'
	count: Number, // Number of people that cited this reason for their stance
	side: String // Yes, No, or Maybe
});
