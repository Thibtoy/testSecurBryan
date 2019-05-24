var mongoose = require('mongoose'),
	ph = require('password-hash'),
	jwt = require('jsonwebtoken'),
	config = require('../config/config'),
	Users = mongoose.model('Users');

exports.connection = function(req,res){
	if (req.method === "POST" && req.body.password && req.body.mail){
		Users.findOne({email: req.body.mail}, function(err, user){
			if (err) res.status(400).json(err);
			if (user != null){ 
				if (ph.verify(req.body.password, user.password)){
					var token = jwt.sign({id: user._id, role: user.role}, config.token_secret);
					res.status(200).json({enableAccess: true, message:"successfully connected", user: user, token: token});
				}
				else res.status(200).json({enableAccess: false, message:"verify your password"});
			}
			else res.status(200).json({enableAccess: false, message:"no user found for this email"});	
		});
	}
	else res.status(200).json({enableAccess: false, message:"you must define your email and your password"});
}