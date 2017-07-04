var Topic = require('../models/topic');
var Reason = require('../models/reason');
var mongoose = require('mongoose');

module.exports = {
	// GET /topic/<UID> or /topic/featured
	// Retrieve specific Topic or the most recent one (using ID 'featured')
	get: function(req, res) {
		// Checks if ID provided is 'featured' or specific Topic UID
		if (req.params.id != "featured") {
			// Find specific Topic matching provided ID
			Topic.findOne({
				_id: req.params.id
			}).exec(function(err, result) {
				if (err) {
					res.status(404);
					res.send("Invalid Topic ID: " + req.params.id);
				} else {
					res.status(200);
					res.send(result);
				}
			});
		} else {
			// Find first Topic instance in database
			Topic.findOne({}).populate("no yes maybe").exec(function(err, result) {
				if (err) {
					res.status(404);
					res.send("No Topic found.");
				} else {
					res.status(200);
					res.send(result);
				}
			})
		}
	},
	// POST /topic/add
	// Add new Topic
	post: function(req, res) {
		// Create and save new Topic based on provided details
		var topic = new Topic();
		topic.question = req.body.topic.question;
		topic.save();

		console.log("Topic \"" + topic.question + "\" submitted. ID: " + topic._id);

		res.send();
		res.status(200);
	},
	// POST /topic/<UID>/<Side>/reason/add
	// Add new Reason under a certain Topic's Side
	addReason: function(req, res) {
		var topic = new Topic();
		// Find provided Topic to add new Reason to
		Topic.findOne({
			_id: req.params.id
		}).exec(function(err, result) {
			if (err) {
				res.status(404);
				res.send("Invalid Topic.");
			}
			topic = result;

			// Ensure client provided valid Side value
			if (req.params.side == 'no' || req.params.side == 'yes' || req.params.side == 'maybe') {
				// Create and save new Reason within Topic's Side
				var reason = new Reason();
				reason.text = req.body.reason;
				reason.count = 1;
				reason.side = req.params.side;

				reason.save();

				// Decides which Topic field to update based on Reason's side
				if (req.params.side == 'no') {
					var newReasons = topic.no;
					newReasons.push(reason);
					topic.no = newReasons;
				} else if (req.params.side == 'yes') {
					var newReasons = topic.yes;
					newReasons.push(reason);
					topic.yes = newReasons;
				} else if (req.params.side == 'maybe') {
					var newReasons = topic.maybe;
					newReasons.push(reason);
					topic.maybe = newReasons;
				}

				console.log("NEW TOPIC: " + topic);

				// Update Topic with new Reason added
				Topic.findByIdAndUpdate(topic._id, {
					yes: topic.yes,
					no: topic.no,
					maybe: topic.maybe
				}, function(err, topic) {
					console.log("Reason \"" + reason.text + "\" submitted. ID: " + reason._id);

					res.send(reason);
					res.status(200);
				});
			} else {
				res.status(400);
				res.send("Invalid side.");
			}
		});
	}
}
