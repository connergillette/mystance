var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

var User = require('../models/User.js');
var Vote = require('../models/Vote.js');

module.exports = {
	add: function(req, res) {
		var user = new User();
		user.save();

		var payload = {
			sub: user._id,
			iat: moment().unix(),
			exp: moment().add(14, 'days').unix()
		};
		var token = jwt.encode(payload, 'secret');
		res.send(token); // TODO: Secure secret for token encoding
	},
	login: function(req, res) {
		// console.log(req.body.token);
		var target_id = jwt.decode(req.body.token, 'secret'); // TODO: Secure secret for token encoding
		// console.log(target_id.sub);
		if (target_id.sub) {
			User.findOne({
				_id: target_id.sub
			}).populate('responses').exec(function(err, user) {
				//TODO Add error if user is not found for front-end to call add()
				// console.log("USER: " + user + ", ERROR: " + err);
				res.send(user);
			})
		}
	}
}
