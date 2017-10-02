(function(){
	'use strict';
		angular.module('ShoppingListPromiseApp',[])
		.controller('ShoppingListController',ShoppingListController)
		.service('ShoppingListService',ShoppingListService)
		.service('WeightControlService',WeightControlService);

		ShoppingListController.$inject = ["ShoppingListService"]
		function ShoppingListController(ShoppingListService){
			var vm = this;
			vm.itemName = "";
			vm.itemQuantity = "";

			vm.addItem = function(){
				ShoppingListService.addItem(vm.itemName,vm.itemQuantity);
			};

		};

		ShoppingListService.$inject = ['WeightControlService','$q'];
		function ShoppingListService(WeightControlService,$q){
			var service = this;
			var items = [];

			service.addItem = function(name,quantity){
				var promise = WeightControlService.checkName(name);

				promise.then(function(response){
					var nextPromise = WeightControlService.checkQuantity(quantity);

					nextPromise.then(function(result){
						var item = {
							name: name,
							quantity : quantity
						};
						items.push(item);
					}, function(error){
						console.log(error.message);
					})
				});

			};
		};


		WeightControlService.$inject = ["$q","$timeout"];
		function WeightControlService($q,$timeout){
			var service = this;

			service.checkName = function(name){
				var deferred = $q.defer();

				var result = {
					message = ""
				};

				$timeout(function(){
					if(name.toLowerCase().indexOf('cookie') == -1){
						deferred.resolve(result);
					}
					else{
						result.message = "You cannot eat cookies !!";
						deferred.reject(error);
					}
				}, 3000);

				return deferred.promise;

			};

			service.checkQuantity = function(quantity){
				var deferred = $q.defer();

				var result = {
					message = ""
				};

				$timeout(function(){
					if(quantity < 6){
						deferred.resolve(result);
					}
					else{
						result.message = "Quota exceeded !!";
						deferred.reject(result);
					}
				},1000);

				return deferred.promise;
			};
		};

})();