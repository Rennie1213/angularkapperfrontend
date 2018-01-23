angular
	.module('project.home', ['project', 'project.home.factory'])
	.controller('HomeController', HomeController);

function HomeController($state, $http, HomeFactory) {

	var home = this;
	
	HomeFactory.get().then(function (data) {
		home.appointments = data.items;
		console.log(home.appointments);
	});

}