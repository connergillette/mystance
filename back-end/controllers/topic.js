var Topic = require('../models/Topic.js');
var Reason = require('../models/Reason.js');
var Vote = require('../models/Vote.js');
var User = require('../models/User.js');

var mongoose = require('mongoose');
var async = require('async');

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
				} else { // If result exists, sort Reason arrays and return
					result.no.sort(function(a, b) {
						return b.count - a.count;
					});
					result.yes.sort(function(a, b) {
						return b.count - a.count;
					});
					result.maybe.sort(function(a, b) {
						return b.count - a.count;
					});
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

			// Check if Reason already exists
			// If it does, iterate count (add a vote)
			// If it doesn't, create it with a count of 1
			Reason.findOne({
				text: req.body.reason
			}).exec(function(err, reason) {
				if (reason) {
					var newCount = reason.count + 1;
					Reason.findByIdAndUpdate(reason._id, { // Update count in Reason
						count: newCount
					}, function(err, newReason) {
						Topic.findByIdAndUpdate(topic._id, { // Update Topic / Reason
							no: topic.no,
							yes: topic.yes,
							maybe: topic.maybe
						}, function(err, newTopic) {
							if (err) {
								res.status(400);
								res.send();
							} else {
								// console.log(req.body);
								changeUserVote(newTopic, newReason, req.body.user);
								res.send(newTopic);
							}
						});
					});
				} else { // If the Reason doesn't already exist...
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

						// Update Topic with new Reason added
						Topic.findByIdAndUpdate(topic._id, {
							yes: topic.yes,
							no: topic.no,
							maybe: topic.maybe
						}, function(err, topic) {
							console.log("Reason \"" + reason.text + "\" submitted. ID: " + reason._id);
							changeUserVote(topic, reason, req.body.user);
							res.send(reason);
							res.status(200);
						});
					} else {
						res.status(400);
						res.send("Invalid side.");
					}
				}
			});
		});
	},
	test: function(req, res) {
		res.send("This is working correctly!");
	}
}

function changeUserVote(topic, reason, user_id) {
	User.findOne({
		_id: user_id
	}).populate("responses").populate({
		path: "responses",
		populate: {
			path: 'reason',
			model: 'Reason'
		}
	}).exec(function(err, user) {
		var newVote = true;
		var voteIndex = -1;
		for (var i = 0; i < user.responses.length; i++) {
			if (user.responses[i].topic.equals(topic._id)) {
				newVote = false;
				voteIndex = i;
				break;
			}
		}

		var vote = new Vote();
		vote.topic = topic;
		vote.reason = reason;
		vote.side = reason.side;

		vote.save();

		var newUser = user;
		if (newVote) {
			newUser.responses.push(vote);
			User.findByIdAndUpdate(newUser._id, {
				responses: newUser.responses
			}, function(err, updatedUser) {
				console.log("User vote added.");
			});
		} else {
			var oldVote = newUser.responses[voteIndex];
			// console.log(oldVote);
			newUser.responses[voteIndex] = vote;
			User.findByIdAndUpdate(newUser._id, {
				responses: newUser.responses
			}, {
				new: true
			}, function(err, updatedUser) {
				var newCount = oldVote.reason.count - 1;
				Reason.findByIdAndUpdate(oldVote.reason._id, {
					count: newCount
				}, {
					new: true
				}, function(err, newReason) {
				});
			});
		}
	});
}
