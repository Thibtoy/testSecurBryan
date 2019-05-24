var mongoose = require('mongoose'),
	ph = require('password-hash'),
	jwt = require('jsonwebtoken'),
	config = require('../config/config'),
	Users = mongoose.model('Users');

exports.viewUsers = function(req,res){
	var token = req.headers['x-access-token'];
	jwt.verify(token, config.token_secret, function(err, decoded){
		if(err) res.status(400).json(err);
		if (decoded.role < 2) res.status(403).json({view: false, message:"you don't have rights to be here..."});
		else {
			Users.find({}, function(err, users){
				if(err) res.status(400).json(err);
				if(users != null){
					res.status(200).json({view: true, message: "welcome to our user's page", users: users});
				}
				else res.status(200).json({view: false, message: "strange that you've seen this message..."});
			});			
		}
	});
}