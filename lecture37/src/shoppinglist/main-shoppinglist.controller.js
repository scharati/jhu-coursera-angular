(function(){
 'use strict';

 angular.module('ShoppingList')
 .controller('MainShoppingListController',MainShoppingListController);

MainShoppingListController.$inject = ['ShoppingListService'];

function MainShoppingListController(ShoppingListService){
   var mlCtrl = this;
   mlCtrl.items = [];

   mlCtrl.$onInit = function(){
   	ShoppingListService.getItems()
   	.then(function(result){
   		mlCtrl.items = result;
   	});
   }

};

})();