(function(){
    'use strict';
    angular.module('data')
    .controller('ItemController',ItemController);

    ItemController.$inject = ['MenuDataService','$stateParams']
    function ItemController(MenuDataService,$stateParams){
        var itemCtrl = this;

        itemCtrl.$onInit = function(){
            MenuDataService.getItemsForCategory($stateParams.catShortName)
            .then(function(result){
                itemCtrl.categoryName = result.data.category.name;
                itemCtrl.items = result.data.menu_items;
            });
        }
    }
})();
