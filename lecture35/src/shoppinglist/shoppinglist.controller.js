(function(){
 'use strict';
angular.module("ShoppingList")
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['ShoppingListFactory'];

function ShoppingListController(ShoppingListFactory){
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

};


})();
