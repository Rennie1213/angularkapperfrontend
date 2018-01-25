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