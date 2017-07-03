var Topic = require('../models/topic');
var Reason = require('../models/reason');
var mongoose = require('mongoose');

module.exports = {
	get: function(req, res) {
		if (req.params.id != "featured") {
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
	post: function(req, res) {
		var topic = new Topic();
		topic.question = req.body.topic.question;
		topic.save();

		console.log("Topic \"" + topic.question + "\" submitted. ID: " + topic._id);

		res.send();
		res.status(200);
	},
	addReason: function(req, res) {
		let topic = new Topic();
		Topic.findOne({
			_id: req.params.id
		}).exec(function(err, result) {
			if (err) {
				res.status(404);
				res.send("Invalid Topic.");
			}
			topic = result;

			if (req.params.side == 'no' || req.params.side == 'yes' || req.params.side == 'maybe') {
				var reason = new Reason();
				reason.text = req.body.reason;
				reason.count = 1;
				reason.side = req.params.side;

				reason.save();

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
