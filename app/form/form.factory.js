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