(function(){
	'use strict';

	var shoppingList1 = ["badanekayi","chavalikayi","savatekayi","bendekayi","yelekosu","hookosu"];

	angular.module('ShoppingListApp',[])
	.controller("ShoppingListController", shoppingListController);

	shoppingListController.$inject = ['$scope'];
	function shoppingListController($scope){
		$scope.shoppingList1 = shoppingList1;
		$scope.itemName = "";
		$scope.itemQuantity = 0;

		$scope.addItem = function (){
			var newItem = {
				"name": $scope.itemName,
				"quantity": $scope.itemQuantity
			};
			shoppingList2.push(newItem);
		};
	};


})();