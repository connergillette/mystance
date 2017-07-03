var mongoose = require("mongoose");

module.exports = mongoose.model('Topic', {
	question: String,
	stub: String,
	no: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Reason'
	}],
	yes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Reason'
	}],
	maybe: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Reason'
	}]
});
