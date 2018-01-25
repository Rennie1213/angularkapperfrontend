angular
    .module('project.form.factory', ['project'])
    .factory('FormFactory', FormFactory);

function FormFactory($http) {

    var response = [];

    var factory = {
        put: put
    };

    return factory;

    ///////////////////////

    function put(item){
        return $http.post('http://gbhavelaar.nl/api/appointments', {
            barber: item.barber,
            date: item.date,
            time: item.time
        })
    }

}