(function(){
    'use strict';
    angular.module("Spinner")
    .component('loadingSpinner',{
        templateUrl: 'src/spinner/spinner.template.html',
        controller:SpinnerController
    });

    SpinnerController.$inject = ['$rootScope'];

    function SpinnerController($rootScope){
        var spCtrl = this;

        var cancelListener = $rootScope.$on('shoppinglist:processing', function(event,data){
            console.log("Event: ", event);
            console.log("Data :", data);

            if(data.on){
                spCtrl.showSpinner = true;
            }
            else{
                spCtrl.showSpinner = false;
            }
        });

        spCtrl.$onDestroy = function(){
            cancelListener();
        }
    };

})();
