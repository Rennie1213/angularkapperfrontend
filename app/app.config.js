angular
	.module('project.config', ['project'])
	.config(configApp);

function configApp($stateProvider, $httpProvider) {

	$httpProvider.defaults.headers.get = { 
		'Accept': 'application/json'
	}

	$stateProvider

		.state('app', {
			name: 'app',
			url: '',
			views: {
				'home': {
					templateUrl: 	'app/home/home.html',
					controller: 	'HomeController',
					controllerAs:   'home'
				}
			}
	 	})


	 console.debug('configuration completed');
}