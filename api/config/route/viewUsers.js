module.exports = function(app){
	const viewUsersController = require('../../controllers/viewUsersController')

	app.route('/viewUsers')
		.post(viewUsersController.viewUsers);
}