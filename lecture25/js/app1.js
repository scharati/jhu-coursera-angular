( function(){
	'use strict';
	angular.module("MenuCategoriesApp",[])
	.controller("MenuCategoriesController",MenuCategoriesController)
	.service('MenuCategoriesService',MenuCategoriesService);

	MenuCategoriesController.$inject = ['MenuCategoriesService'];

	function MenuCategoriesController(MenuCategoriesService){
		var menu = this;
		var promise = MenuCategoriesService.getMenuCategories();
		promise.then(function(response){
			menu.categories = response.data;
		})
		.catch(function(response){
			console.log("Something went wrong!!");
		});

		menu.showItems = function(shortName){
			var promise = MenuCategoriesService.getMenuForCategory(shortName);
			
			promise.then(function(response){

			}).catch(function(response){
				console.log("+++ error encountered!!");
			})
		}
	};

	MenuCategoriesService.$inject = ['$http'];
	function MenuCategoriesService($http){
		var service = this;
		service.getMenuCategories = function(){
			var response = $http({
				method:"GET",
				url: ("http://davids-restaurant.herokuapp.com/categories.json")
			});

			return response;
		};

		service.getMenuForCategory = function(shortName){
			var response = $http({
				method:"GET",
				url:("http://davids-restaurant.herokuapp.com/menu_items.json"),
				params: {
					category:shortName
				}
			});

			return response;
		};

	}


})();