var utils = require('shipit-utils');
var request = require('request');
var chalk = require('chalk');

/**
	* Initialize the task.
	* - Emit newrelic event
	*/

module.exports = function(gruntOrShipit) {
	
	utils.registerTask(gruntOrShipit, 'new-relic:notify', task);

	function task() {
		var shipit = utils.getShipit(gruntOrShipit);
		var config = shipit.config.newrelic;
		var data = {
			'deployment[user]': process.env.USER
		};
		// 'deployment[changelog]': not yet supported,

		if (config.applicationId || config.applicationName) {
			if (config.applicationId)
				data['deployment[application_id]'] = config.applicationId;
			if (config.applicationName)
				data['deployment[app_name]'] = config.applicationName;
		} else
			return shipit.log(chalk.red('Notification not sent.  Must provide application name or id.'));

		// TODO: break these out into functions
		return shipit.local('git log -1 --pretty=%B', {cwd: shipit.config.workspace})
		.then(function(response) {
			response = response.stdout.trim();
			data['deployment[description]'] = response;
			return shipit.local('git rev-parse --verify HEAD', {cwd: shipit.config.workspace})
		})
		.then(function(response) {
			response = response.stdout.trim();
			data['deployment[revision]'] = response;
			return;
		})
		.then(function() {
			var endpoint = 'https://api.newrelic.com/deployments.xml';
			var headers = { 'x-api-key': config.apiKey };
			request.post({ url: endpoint, headers: headers, formData: data });

			shipit.emit('notified');
		});
	}
};