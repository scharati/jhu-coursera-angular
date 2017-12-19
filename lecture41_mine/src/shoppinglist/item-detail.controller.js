(function(){
    'use strict';
    angular.module('ShoppingList')
    .controller('ItemDetailController',ItemDetailController);

    ItemDetailController.$inject = ['$stateParams','items'];
    function ItemDetailController($stateParams, items){
        var itemDetail = this;
        var item = items[$stateParams.itemId];
        console.log("+++ controller ++++ : ", item);
        itemDetail.name = item.name;
        itemDetail.quantity = item.quantity;
        itemDetail.description = item.description;

        console.log("+++ post: ", itemDetail);
    }

})();
