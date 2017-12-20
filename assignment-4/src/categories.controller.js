(function(){
    'use strict';
    angular.module('data')
    .controller('CategoriesController',CategoriesController);

    CategoriesController.$inject = ['MenuDataService'];
    function CategoriesController(MenuDataService){
        var cCtrl = this;
        cCtrl.items =  [];

        cCtrl.$onInit = function(){
        MenuDataService.getAllCategories().then(function(result){
            cCtrl.items = result.data;
        });
      }

    }

})();
