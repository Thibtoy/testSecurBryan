module.exports = function(app){
	const updateAdminController = require('../../controllers/updateAdminController')

	app.route('/updateAdmin')
		.put(updateAdminController.updateAdmin);
}