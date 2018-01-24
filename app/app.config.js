angular
	.module('project.config', ['project'])
	.config(configApp);

function configApp($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {

	$httpProvider.defaults.headers.get = { 
		'Accept': 'application/json'
	}

	$httpProvider.defaults.headers.post = { 
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}

	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise('/home');

	$stateProvider

		.state('app', {
			name: 'app',
			url: '/home',
			abstract: true,
			views: {
				'header': {
					templateUrl: 'app/header/header.html',
					controller:  'HeaderController',
					controllerAs: 'header'
				}
			}
	 	})

	 	.state('home', {
	 		name: 'home',
	 		url: '/home',
	 		views: {
	  		'content@': {
	  			templateUrl: 	'app/home/home.html',
	  			controller: 	'HomeController',
	  			controllerAs: 'home'
	  		}
	 	}})

	 	.state('form', {
	 		name: 'form',
	 		url: '/form/{id}',
	 		views: {
	  		'content@': {
	  			templateUrl: 	'app/form/form.html',
	  			controller: 	'FormController',
	  			controllerAs: 'form'
	  		}
	 	}});


	 console.debug('configuration completed');
}