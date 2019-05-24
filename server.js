const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	user = require('./api/models/userModel');
	
	mongoose.connect('mongodb://localhost/leTest', {useNewUrlParser: true});

const app = express();
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());

const connectionRoute = require('./api/config/route/connection');
		connectionRoute(app);

const registerRoute = require('./api/config/route/register');
		registerRoute(app);

const updateAdminRoute = require('./api/config/route/updateAdmin');
		updateAdminRoute(app);

const deleteUserRoute = require('./api/config/route/deleteUser');
		deleteUserRoute(app);

const viewUsersRoute = require('./api/config/route/viewUsers');
		viewUsersRoute(app);

	app.use(function(req,res){
		res.status(404).send({message: req.originalUrl + ' not found'});
	});

	app.listen(3000, () => {
		console.log('server listening on port:3000');
	})

