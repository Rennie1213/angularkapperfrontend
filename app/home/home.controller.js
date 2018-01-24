angular
	.module('project.home', ['project', 'project.home.factory'])
	.controller('HomeController', HomeController);

function HomeController($state, $http, HomeFactory) {

	var home = this;
	home.newAppointmentData = {
		barder: '',
		date: '',
		time: ''
	}
	
	HomeFactory.get().then(function (data) {
		home.appointments = data.items;
		console.log(home.appointments);
	});

	home.newAppointment = function() {
		console.log(home.newAppointmentData)
		HomeFactory.post(home.newAppointmentData).then(function (response) {
			console.log(response);
		}).catch(function (error) {
			console.log(error);
		})
	}

}