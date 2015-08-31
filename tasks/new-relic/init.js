var utils = require('shipit-utils');

/**
	* Initialize the task.
	* - Emit newrelic event
	*/

module.exports = function(gruntOrShipit) {
	
	utils.registerTask(gruntOrShipit, 'new-relic:init', task);

	function task() {
		var shipit = utils.getShipit(gruntOrShipit);
		shipit.emit('new-relic');
	}
};