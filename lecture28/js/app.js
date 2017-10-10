(function(){
	angular.module('ShoppingListDirectiveApp',[])
	.controller('ShoppingListController1',ShoppingListController1)
	.controller('ShoppingListController2',ShoppingListController2)
	.factory("ShoppingListFactory", ShoppingListFactory)
	// .directive('listItemDescription', ListItemDescription)
	// .directive('listItem',ListItem);
	.directive("shoppingList",ShoppingList);

	function ShoppingList(){
		var ddo = {
			templateUrl : 'shoppinglist.html',
			scope : {
				list:"=myList",
				title:"@title"
			}
		};

		return ddo;
	}


	ShoppingListController1.$inject = ['ShoppingListFactory'];

	function ShoppingListController1(ShoppingListFactory){
		var slvm = this;
		slvm.itemName = "";
		slvm.itemQuantity = "";

		// use factory to create new shopping list service
		var shoppingList = ShoppingListFactory();

		slvm.items = shoppingList.getItems();

		var origTitle = "Shopping List #1";
		slvm.title = origTitle + " ( " + slvm.items.length + " items )";

		slvm.addItem = function(){
			shoppingList.addItem(slvm.itemName, slvm.itemQuantity);
			slvm.title = origTitle + " ( " + slvm.items.length + " items )";			
		}

		slvm.removeItem = function(index){
			shoppingList.removeItem(index);
			slvm.title = origTitle + " ( " + slvm.items.length + " items )";			
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

		var origTitle = "Shopping List #2";
		slvm.title = origTitle + " ( " + slvm.items.length + " items )";

		slvm.addItem = function(){
			try{
				shoppingList.addItem(slvm.itemName, slvm.itemQuantity);	
				slvm.title = origTitle + " ( " + slvm.items.length + " items )";			
			}
			catch(error){
				slvm.errorMessage = error.message;
			}

		}

		slvm.removeItem = function(index){
			shoppingList.removeItem(index);
			slvm.title = origTitle + " ( " + slvm.items.length + " items )";
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


	function ShoppingListFactory(){
		var factory = function(maxItems){
			return new ShoppingListService(maxItems);
		};

		return factory;
	}

})();