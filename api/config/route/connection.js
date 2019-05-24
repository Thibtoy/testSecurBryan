module.exports = function(app) {
	const connectionController = require("../../controllers/connectionController");

	app.route('/connection') 
		.post(connectionController.connection);	
}