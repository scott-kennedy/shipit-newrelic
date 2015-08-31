var utils = require('shipit-utils');

/**
	* New Relic notification task
	* - newrelic:init
	* - newrelic:notify
	*/

module.exports = function(gruntOrShipit) {
	require('./init')(gruntOrShipit);
	require('./notify')(gruntOrShipit);

	var shipit = utils.getShipit(gruntOrShipit);

	utils.registerTask(gruntOrShipit, 'new-relic', [
		'new-relic:init',
		'new-relic:notify'
	]);

	shipit.on('published', function() {
		shipit.start('new-relic');
	});
};