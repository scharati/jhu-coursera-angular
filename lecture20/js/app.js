(function(){
	angular.module('ShoppingListApp',[])
	.controller('ShoppingListAddController',ShoppingListAddController)
	.controller('ShoppingListShowController',ShoppingListShowController)
	.service("ShoppingListService", ShoppingListService);

	ShoppingListAddController.$inject = ['ShoppingListService'];

	function ShoppingListAddController(ShoppingListService){
		var slvm = this;
		slvm.itemName = "";
		slvm.itemQuantity = "";

		slvm.addItem = function(){
			ShoppingListService.addItem(slvm.itemName, slvm.itemQuantity);
		}
	}

	function ShoppingListService(){
		var service = this;

		// List of shopping items
		var items = [];

		service.addItem = function(itemName, itemQuantity){
			var item = {
				name : itemName,
				quantity: itemQuantity
			}

			items.push(item);
		};

		service.getItems = function(){
			return items;
		};

		service.removeItem = function(index){
			items.splice(index);
		};
	}

	function ShoppingListShowController(ShoppingListService){

		var slvm = this;
		slvm.items = ShoppingListService.getItems();

		slvm.removeItem = function(index){
			ShoppingListService.removeItem(index);
		};

	}

})();