var mongoose = require('mongoose'),
	ph = require('password-hash'),
	jwt = require('jsonwebtoken'),
	config = require('../config/config'),
	Users = mongoose.model('Users');

exports.updateAdmin = function(req,res){
	var token = req.headers['x-access-token'];
	jwt.verify(token, config.token_secret, function(err, decoded){
		if(err) res.status(400).json(err);
		if (decoded.role != 3) res.status(403).json({updated: false, message:"you don't have rights to be here..."});
		else {
			if (req.body.mail) {
				Users.findOne({email: req.body.mail}, function(err, updatedUser){
					if(err) res.status(400).json(err);
					if(updatedUser != null){
						Users.update({ email: req.body.mail }, { $set: { "role": req.body.role } }, function(err, bckMsg){
							if(err) res.status(400).json(err);
							else res.status(200).json({updated: true, message: "user updated successfully", proof: bckMsg});
						});
					}
					else res.status(200).json({updated: false, message: "no account exists for this email."});
				});
			}
			else res.status(200).json({updated: false, message: "you must give the email of the account that you wan't to update"});
		}
	});
}