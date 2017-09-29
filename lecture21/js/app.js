(function(){
	angular.module('ControllerAsApp',[])
	.controller('ShoppingListController1',ShoppingListController1)
	.controller('ShoppingListController2',ShoppingListController2)
	.factory("ShoppingListFactory", ShoppingListFactory);

	ShoppingListController1.$inject = ['ShoppingListFactory'];

	function ShoppingListController1(ShoppingListFactory){
		var slvm = this;
		slvm.itemName = "";
		slvm.itemQuantity = "";

		// use factory to create new shopping list service
		var shoppingList = ShoppingListFactory();

		slvm.items = shoppingList.getItems();


		slvm.addItem = function(){
			shoppingList.addItem(slvm.itemName, slvm.itemQuantity);
		}

		slvm.removeItem = function(index){
			shoppingList.removeItem(index);
		};

	}

	ShoppingListController2.$inject = ['ShoppingListFactory'];

	function ShoppingListController2(ShoppingListFactory){
		var slvm = this;
		slvm.itemName = "";
		slvm.itemQuantity = "";

		// use factory to create new shopping list service
		var shoppingList = ShoppingListFactory(3);

		slvm.items = shoppingList.getItems();


		slvm.addItem = function(){
			try{
				shoppingList.addItem(slvm.itemName, slvm.itemQuantity);				
			}
			catch(error){
				slvm.errorMessage = error.message;
			}

		}

		slvm.removeItem = function(index){
			shoppingList.removeItem(index);
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
			items.splice(index);
		};
	}


	function ShoppingListFactory(){
		var factory = function(maxItems){
			return new ShoppingListService(maxItems);
		};

		return factory;
	}

})();