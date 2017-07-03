var Topic = require('../models/topic');
var mongoose = require('mongoose');

module.exports = {
	get: function(req, res) {
		Topic.findOne({
			_id: req.params.id
		}).exec(function(err, result) {
			res.send(result);
			res.status(200);
		});
	},
	post: function(req, res) {
		var topic = new Topic();
		topic.question = req.body.topic.question;
		topic.save();

		console.log("Topic \"" + topic.question + "\" submitted. ID: " + topic._id);

		res.send();
		res.status(200);
	}
}
