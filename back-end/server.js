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

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
	if (!err) {
		console.log("Connected to Mongo");
	}
})

server.listen(4000, function() {
	console.log("Server listening on port 4000");
});
