module.exports = function(app){
	const deleteUserController = require('../../controllers/deleteUserController')

	app.route('/deleteUser')
		.delete(deleteUserController.deleteUser);
}