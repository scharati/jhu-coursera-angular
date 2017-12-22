(function(){
    angular.module('SimpleFormsApp',[]);

    angular.module('SimpleFormsApp')
    .controller('RegistrationController',RegistrationController);

    function RegistrationController(){
        var ctrl = this;

        ctrl.submit = function(){
            ctrl.completed = true;
        }
    }


})();
