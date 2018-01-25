angular
	.module('project.form', ['project', 'project.home.factory'])
	.controller('FormController', FormController);

function FormController($state, $stateParams, HomeFactory) {

	var form = this;
	var id = $stateParams.id;


	form.appointment = HomeFactory.getById(id);
	form.castDate = new Date(form.appointment.date);
	form.castTime = new Date(form.appointment.time);

	console.log(form.appointment.barber);

    form.editAppointment = function() {
        console.log(form.appointment);
        FormFactory.put(form.appointment).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    }

}