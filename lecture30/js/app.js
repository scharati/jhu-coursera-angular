(function(){
	angular.module('ShoppingListDirectiveApp',[])
	.controller('ShoppingListController1',ShoppingListController1)
	.factory("ShoppingListFactory", ShoppingListFactory)
	.directive("shoppingList",ShoppingListDirective);

	function ShoppingListDirective(){
		var ddo = {
			templateUrl : 'shoppinglist.html',
			scope : {
				items:"<",
				title:"@",
                badRemove:'=',
                onRemove:'&'
			},
			controller: ShoppingListDirectiveController,
			controllerAs:'list',
			bindToController: true

		};

		return ddo;
	}

	function ShoppingListDirectiveController(){
		var sldvm = this;
		console.log("+++ INSIDE DIRECTIVE CONTROLLER +++");
		console.log(sldvm);

		sldvm.CookiesInList = function(){
			for(var i=0; i < sldvm.items.length; i++){
				 var name = sldvm.items[i].name;
				 if(name.toLowerCase().indexOf("cookie") !== -1){
				 	 return true;
				 }
			}

			return false;
		}

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
            console.log("+++ addItem() : this is :", this);
			shoppingList.addItem(slvm.itemName, slvm.itemQuantity);
			slvm.title = origTitle + " ( " + slvm.items.length + " items )";
		}

		slvm.removeItem = function(index){
            console.log("+++ removeItem() : this is : ", this);
            this.lastRemoved = this.items[index].name;
			shoppingList.removeItem(index);
			console.log("+++ Title on SLVM +++");
            slvm.title = origTitle + " ( " + slvm.items.length + " items )";
            console.log("slvm is :");
            console.log(slvm);
            console.log("++ Title on this +++");
            this.title = origTitle + " ( " + slvm.items.length + " items )";
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
