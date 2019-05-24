module.exports = function(app) {
	const registerController = require('../../controllers/registerController');

	app.route('/register')
		.post(registerController.register);
}