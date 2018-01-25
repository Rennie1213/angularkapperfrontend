angular
	.module('project.home.factory', ['project'])
	.factory('HomeFactory', HomeFactory);

function HomeFactory($http) {

	var response = [];

	var factory = {
		get: get,
		post: post,
		destroy: destroy,
		getById: getById,
		getPage: getPage
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

  	function getPage(pageNumber) {
		return $http.get('http://gbhavelaar.nl/api/appointments?page=' + pageNumber).then(function (getComplete) {
	      	response = getComplete.data;

	      	return response;
	      })
	      .catch(function (error) {
	      	console.log(error);
	      });
  	}

  	function post(item){
  		return $http.post('http://gbhavelaar.nl/api/appointments', {
  			barber: item.barber,
  			date: item.date,
  			time: item.time
  		})
  	}

  	function destroy(id) {
		return $http.delete('http://gbhavelaar.nl/api/appointments/' + id)
    }


  	function getById(id) {
  		var appointment = {};
  		angular.forEach(response.items, function(value, key) {
  			if (value.id == id) {
  				appointment = value;
  			}
  		});
  		return appointment;
  	}

}