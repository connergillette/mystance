var express = require("express");
var server = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var topic = require('./controllers/topic');
var auth = require('./controllers/auth');
var cors = require('./services/cors');

server.use(cors);
server.use(bodyParser.json());

server.get('/topic/:id', function(req, res, next) {
	res.id = req.params.id;
	next();
}, topic.get);

server.post('/topic/add', topic.post);

server.post('/topic/:id/:side/reason/add', function(req, res, next) {
	res.id = req.params.id;
	res.side = req.params.side;
	next();
}, topic.addReason);

server.get('/user/add', auth.add);

server.post('/user/login', auth.login);
// process.env.MONGOLAB_URI ||
mongoose.connect("mongodb://heroku_1d5zllb6:heroku_1d5zllb6@ds115712.mlab.com:15712/heroku_1d5zllb6", function(err, db) {
	// mongoose.connect("mongodb://127.0.0.1:27017", function(err, db) {

	if (!err) {
		console.log("Connected to Mongo");
	} else {
		console.log("MONGO ERROR: " + err);
	}
})

server.listen(process.env.PORT || 4000, function() {
	server.use(express.static(__dirname));
	console.log("Server listening on port 4000");
});

// server.listen(4000, function() {
// 	console.log("Server listening on port 4000");
// });
