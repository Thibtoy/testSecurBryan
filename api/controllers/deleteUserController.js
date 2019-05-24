var mongoose = require('mongoose'),
	ph = require('password-hash'),
	jwt = require('jsonwebtoken'),
	config = require('../config/config'),
	Users = mongoose.model('Users');

exports.deleteUser = function(req,res){
	var token = req.headers['x-access-token'];
	jwt.verify(token, config.token_secret, function(err, decoded){
		if(err) res.status(400).json(err);
		if (decoded.role < 2) res.status(403).json({deleted: false, message:"you don't have rights to be here..."});
		else {
			if (req.body.mail) {
				Users.find({email: req.body.mail}, function(err, user){
					if (err) res.status(400).json(err);
					if (user != null) {
						Users.deleteOne({email: req.body.mail}, function(err, bckMsg){
							if (err) res.status(400).json(err);
							else res.status(202).json({deleted: true, message:"user deleted successfully", proof: bckMsg});
						})
					}
					else res.status(200).json({deleted: false, message: "no account exists for this email."});	
				});
			}
			else res.status(200).json({deleted: false, message: "you must give the email of the account that you wan't to update"});
		}
	});
}