(function(){
	angular.module('ShoppingListApp',[])
	.controller('ShoppingListController',ShoppingListController)
	.provider("ShoppingListService", ShoppingListServiceProvider)
	.config(Config);

	Config.$inject = ['ShoppingListServiceProvider'];

	function Config(ShoppingListServiceProvider){
		ShoppingListServiceProvider.defaults.maxItems = 2;
	}

	ShoppingListController.$inject = ['ShoppingListService'];

	function ShoppingListController(ShoppingListService){
		var slvm = this;
		slvm.itemName = "";
		slvm.itemQuantity = "";

		slvm.items = ShoppingListService.getItems();


		slvm.addItem = function(){
			try{
				 ShoppingListService.addItem(slvm.itemName, slvm.itemQuantity);				
			}catch(error){
				slvm.errorMessage = error.message;
			}
			
		}

		slvm.removeItem = function(index){
			slvm.errorMessage = null;
			ShoppingListService.removeItem(index);

		};

	}


	function ShoppingListService(maxItems){
		var service = this;

		// List of shopping items
		var items = [];

		service.addItem = function(itemName, itemQuantity){

			if( (maxItems === undefined ) || maxItems !== undefined && items.length < maxItems){
				var item = {
					name : itemName,
					quantity: itemQuantity
				}

				items.push(item);

			}
			else{
				 throw new Error("Max Items( " + maxItems + ") reached.");
			}

		};

		service.getItems = function(){
			return items;
		};

		service.removeItem = function(index){
			items.splice(index,1);
		};
	}


	function ShoppingListServiceProvider(){
		var provider = this;

		provider.defaults = {
			maxItems: 10
		};

		provider.$get = function(){
			var shoppingList = new ShoppingListService(provider.defaults.maxItems);
			return shoppingList;
		};
	}

})();