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
__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

angular.module('project', ['project.run', 'project.config']);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

angular
	.module('project.run', ['ui.router', 'project.header', 'project.home', 'project.form'])
	.run(runApp);

function runApp() {
	console.debug('init dependencies');
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

angular
	.module('project.form', ['project', 'project.home.factory'])
	.controller('FormController', FormController);

function FormController($state, $stateParams, HomeFactory) {

	var form = this;
	var id = $stateParams.id;


	form.appointment = HomeFactory.getById(id);

	console.log(form.appointment.barber);

}

/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ }),
/* 6 */
/***/ (function(module, exports) {

angular
	.module('project.header', ['project'])
	.controller('HeaderController', HeaderController);

function HeaderController($state) {
	var header = this;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

angular
	.module('project.home.factory', ['project'])
	.factory('HomeFactory', HomeFactory);

function HomeFactory($http) {

	var response = [];

	var factory = {
		get: get,
		post: post,
		getById: getById
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

  	function post(item){
  		return $http.post('http://gbhavelaar.nl/api/appointments', {
  			barber: item.barber,
  			date: item.date,
  			time: item.time
  		})
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