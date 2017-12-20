(function(){
    'use strict';
    angular.module('Spinner')
    .component('loadingSpinner',{
        templateUrl: 'src/spinner/loadingspinner.template.html',
        controller:SpinnerController
    });

    SpinnerController.$inject = ['$rootScope'];

    function SpinnerController($rootScope){
        var sCtrl = this;
        console.log("+++ entered the LoadingSpinnerController +++");

        var cancellers = [];

        sCtrl.$onInit = function(){
            console.log("++ initializing the SpinnerController ++");

            var cancel = $rootScope.$on('$stateChangeStart',
                function(event,toState,toParams,fromState,fromParams,options){
                    $ctrl.showSpinner = true;
                    console.log("+++ turning the spinner on +++");
            });
        };
    };

})();
