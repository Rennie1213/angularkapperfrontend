angular
	.module('project.home.factory', ['project'])
	.factory('HomeFactory', HomeFactory);

function HomeFactory($http) {

	// $httpProvider.defaults.headers.get = { 'Accept' : 'application/json' }

	var response = [];

	var factory = {
		get: get
	};

	return factory;

	///////////////////////

	function get() {
		return $http.get('http://gbhavelaar.nl/api/appointments').then(function (getComplete) {
	      	response = getComplete.data;

	      	return response;
	      })
	      .catch(function (error) {
	      	console.log(error);
	      });
  	}

}