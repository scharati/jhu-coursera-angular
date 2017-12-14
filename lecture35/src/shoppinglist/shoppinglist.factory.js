(function(){
    'use strict';
    angular.module("ShoppingList")
    .factory("ShoppingListFactory",ShoppingListFactory);

    function ShoppingListFactory(){
        var factory = function(maxItems){
            return new ShoppingListService(maxItems);
        };

        return factory;
    };

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
    };

})();
