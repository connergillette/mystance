var mongoose = require("mongoose");

module.exports = mongoose.model('Vote', {
	topic: {
		type: mongoose.Schema.ObjectId,
		ref: 'Topic'
	},
	reason: {
		type: mongoose.Schema.ObjectId,
		ref: 'Reason'
	},
	side: String // No, Yes, Maybe
});
