angular
	.module('project.form', ['project', 'project.home.factory'])
	.controller('FormController', FormController);

function FormController($state, $stateParams, HomeFactory) {

	var form = this;
	var id = $stateParams.id;


	form.appointment = HomeFactory.getById(id);

	console.log(form.appointment.barber);

}