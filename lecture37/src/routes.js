(function(){
	'use strict';

	angular.module('ShoppingList')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider,$urlRouterProvider){

		// Redirect to the home page if no other URL matches
		$urlRouterProvider.otherwise("/");

		// set up UI states

		// Home page
		$stateProvider.state('home', {
			url:'/',
			templateUrl: 'src/shoppinglist/templates/home.template.html'
		})

		// premade list page
		.state('mainList',{
			url:'/main-list',
			templateUrl:'src/shoppinglist/templates/main-shoppinglist-template.html',
			controller: 'MainShoppingListController as mainList'
		});
	}


})();