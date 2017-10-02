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

			vm.items = ShoppingListService.getItems();
			vm.addItem = function(){
				ShoppingListService.addItem(vm.itemName,vm.itemQuantity);
			};

		};


		// First Cut:
		// ShoppingListService.$inject = ['WeightControlService','$q'];
		// function ShoppingListService(WeightControlService,$q){
		// 	var service = this;
		// 	var items = [];

		// 	service.addItem = function(name,quantity){
		// 		var promise = WeightControlService.checkName(name);

		// 		promise.then(function(response){
		// 			var nextPromise = WeightControlService.checkQuantity(quantity);

		// 			nextPromise.then(function(result){
		// 				var item = {
		// 					name: name,
		// 					quantity : quantity
		// 				};
		// 				items.push(item);
		// 			}, function(result){
		// 				console.log(result.message);
		// 			})
		// 		});

		// 	};

		// 	service.getItems = function(){
		// 		return items;
		// 	}
		// };

		// Second Cut : uses catch and chaining
		// ShoppingListService.$inject = ['WeightControlService','$q'];
		// function ShoppingListService(WeightControlService,$q){
		// 	var service = this;
		// 	var items = [];

		// 	service.addItem = function(name,quantity){
		// 		var promise = WeightControlService.checkName(name);

		// 		promise.then(function(result){
		// 			return WeightControlService.checkQuantity(quantity);
		// 		}).then(function (result){
		// 			var item = {
		// 				name : name,
		// 				quantity : quantity
		// 			};

		// 			items.push(item);
		// 		}).catch(function(result){
		// 			console.log(result.message);
		// 		});


		// 	};

		// 	service.getItems = function(){
		// 		return items;
		// 	}
		// };


		// Final Cut : uses parallel execution for quantity and name check
		ShoppingListService.$inject = ['WeightControlService','$q'];
		function ShoppingListService(WeightControlService,$q){
			var service = this;
			var items = [];

			service.addItem = function(name,quantity){

				var namePromise = WeightControlService.checkName(name);
				var qtyPromise = WeightControlService.checkQuantity(quantity);

				$q.all([namePromise,qtyPromise])
				.then(function(response){
					var item = {
						name : name,
						quantity : quantity
					};
					items.push(item);
				}).catch(function(response){
					console.log(response.message);
				});

			}

			service.getItems = function(){
				return items;
			}
		};

		WeightControlService.$inject = ["$q","$timeout"];

		function WeightControlService($q,$timeout){
			
			var service = this;

			service.checkName = function(name){
				var deferred = $q.defer();

				var result = {
					message: ""
				};

				$timeout(function(){
					if(name.toLowerCase().indexOf('cookie') == -1){
						deferred.resolve(result);
					}
					else{
						result.message = "You cannot eat cookies !!";
						deferred.reject(result);
					}
				}, 3000);

				return deferred.promise;

			};

			service.checkQuantity = function(quantity){
				var deferred = $q.defer();

				var result = {
					message : ""
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


		}

	

})();