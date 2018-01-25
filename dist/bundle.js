/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

angular
	.module('angularkapperfrontend.config', ['angularkapperfrontend'])
	.config(configApp);

function configApp($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {

	$httpProvider.defaults.headers.get = { 
		'Accept': 'application/json'
	}
	$httpProvider.defaults.headers.post = { 
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
    $httpProvider.defaults.headers.delete = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    $httpProvider.defaults.headers.put = {
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

angular.module('angularkapperfrontend', ['angularkapperfrontend.run', 'angularkapperfrontend.config']);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

angular
	.module('angularkapperfrontend.run', ['ui.router', 'angularkapperfrontend.home', 'angularkapperfrontend.form'])
	.run(runApp);

function runApp() {
	console.debug('init dependencies');
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

angular
	.module('angularkapperfrontend.form', ['angularkapperfrontend', 'angularkapperfrontend.home.factory', 'angularkapperfrontend.form.factory'])
	.controller('FormController', FormController);

function FormController($state, $stateParams, HomeFactory, FormFactory) {

	var form = this;
	var id = $stateParams.id;

	form.appointment = HomeFactory.getById(id);
	form.appointment.castDate = new Date(form.appointment.date);
	form.appointment.castTime = new Date(form.appointment.time);

    form.editAppointment = function() {
        FormFactory.put(form.appointment).then(function (response) {
            $state.go('home');
        }).catch(function (error) {
            console.log(error);
        })
    }

}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

angular
    .module('angularkapperfrontend.form.factory', ['angularkapperfrontend'])
    .factory('FormFactory', FormFactory);

function FormFactory($http) {

    var response = [];

    var factory = {
        put: put
    };

    return factory;

    ///////////////////////

    function put(item){
        return $http.put('http://gbhavelaar.nl/api/appointments/' + item.id, {
            barber: item.barber,
            date: item.castDate,
            time: item.castTime
        })
    }

}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

angular
	.module('angularkapperfrontend.home', ['angularkapperfrontend', 'angularkapperfrontend.home.factory'])
	.controller('HomeController', HomeController);

function HomeController($state, $http, HomeFactory) {

	var home = this;

	home.newAppointmentData = {
		barder: '',
		date: '',
		time: ''
	};

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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

angular
	.module('angularkapperfrontend.home.factory', ['angularkapperfrontend'])
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

/***/ })
/******/ ]);