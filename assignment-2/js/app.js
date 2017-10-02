(function(){
	angular.module('ShoppingListCheckOff',[])
	.controller('ToBuyController',ToBuyController)
	.controller('AlreadyBoughtController',AlreadyBoughtController)
	.service('ShoppingListService',ShoppingListService);

	var defaultItemList = [
		{
			name: "Patanjali-Biscuit",
			quantity: 10
		},
		{
			name: "Godrej-RollOn",
			quantity: 7
		},
		{
			name: "Walnut",
			quantity: "2 packs"
		},
		{
			name: "Mysore Sandal Gold",
			quantity: "1 box"
		},
		{
			name: "Santoor - handwash",
			quantity: 4
		}
	];

	ToBuyController.$inject = ['ShoppingListService'];
	function ToBuyController(ShoppingListService){
		var vm = this;
		var toBuyItems = ShoppingListService.getToBuyItems();

		if(toBuyItems === undefined || toBuyItems === null || toBuyItems.length < 1){
			ShoppingListService.populateToBuyItems(defaultItemList);
			toBuyItems = ShoppingListService.getToBuyItems();
		}

		vm.items = toBuyItems;

		vm.buyItem = function(index){
			ShoppingListService.buyItem(index);
		};
	};

	AlreadyBoughtController.$inject =['ShoppingListService'];
	function AlreadyBoughtController(ShoppingListService){
		var vm = this;
		vm.items = ShoppingListService.getAlreadyBoughtItems();
	}

	function ShoppingListService(){
		var service = this;
		var toBuyItems = [];
		var boughtItems = [];
		service.buyItem = function(itemIndex){
			var boughtItem = toBuyItems[itemIndex];
			if(boughtItem){
				boughtItems.push(boughtItem);
			}
			toBuyItems.splice(itemIndex,1);
		};

		service.populateToBuyItems = function(items){
			toBuyItems = items;
		};

		service.getToBuyItems = function(){
			return toBuyItems;
		};

		service.getAlreadyBoughtItems = function(){
			return boughtItems;
		};
	}

})();