(function(){
	'use strict';

	var shoppingList1 = ["badanekayi","chavalikayi","savatekayi","bendekayi","yelekosu","hookosu"];

	var shoppingList2 = [
	{
		"name":"MysorePak",
		"quantity": 10	
	},
	{
		"name": "Pedha",
		"quantity": 50
	},
	{
		"name": "Chiroti",
		"quantity": 100
	},
	{
		"name": "Burfi",
		"quantity" : 400
	}
	]

	angular.module('ShoppingListApp',[])
	.controller("ShoppingListController", shoppingListController);

	shoppingListController.$inject = ['$scope'];
	function shoppingListController($scope){
		$scope.shoppingList1 = shoppingList1;
		$scope.shoppingList2 = shoppingList2;
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