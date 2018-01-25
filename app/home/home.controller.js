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

	home.activePage = 1;
	home.loading = false;
	
	// init
	getByPage();

	function getByPage () {
		HomeFactory.getPage(home.activePage).then(function (data) {
			home.appointments = data.items;
		});
	}


	home.getNewPage = function(value) {
		home.activePage += value;
		getByPage();
	}


	home.newAppointment = function() {
		home.loading = true;

		HomeFactory.post(home.newAppointmentData).then(function (response) {
			home.loading = false;
			getByPage();
		}).catch(function (error) {
			console.log(error);
		})
	};


	home.destroyAppointment =  function(id){
		HomeFactory.destroy(id).then(function(response){
            getByPage();
        }).catch(function (error) {
            console.log(error);
        })
	}

}