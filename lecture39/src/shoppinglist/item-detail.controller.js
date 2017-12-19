(function(){
    'use strict';
    angular.module('ShoppingList')
    .controller('ItemDetailController',ItemDetailController);

    ItemDetailController.$inject = ['item'];
    function ItemDetailController(item){
        var itemDetail = this;
        console.log("+++ controller ++++ : ", item);
        itemDetail.name = item.name;
        itemDetail.quantity = item.quantity;
        itemDetail.description = item.description;

        console.log("+++ post: ", itemDetail);
    }

})();
