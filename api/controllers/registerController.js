var mongoose = require('mongoose'),
	ph = require('password-hash'),
	jwt = require('jsonwebtoken'),
	Users = mongoose.model('Users');

exports.register = function(req, res){
	if (req.method === "POST" && req.body.password && req.body.mail){
		Users.findOne({email: req.body.mail}, function(err, user){
			if (err) res.status(400).json(err);
			if (user == null) {
				Users.create({email: req.body.mail, password: ph.generate(req.body.password), role: 1}, function(err, user){
					if (err) res.status(400).json(err);
					else res.status(201).json({created: true, message:"user successfully created", user:user});
				});
			}
			else res.status(200).json({created: false, message:"an account already exists for this email"});
		});
	}
	else res.status(200).json({created: false, message:"you must define your email and your password for create your account"});
}