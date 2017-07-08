var mongoose = require("mongoose");

module.exports = mongoose.model('User', {
	responses: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Vote'
	}]
});
