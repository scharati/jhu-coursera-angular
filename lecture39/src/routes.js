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

	  // Premade list page
	  .state('mainList', {
	    url: '/main-list',
	    templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
	    controller: 'MainShoppingListController as mainList',
	    resolve: {
	      items: ['ShoppingListService', function (ShoppingListService) {
	        return ShoppingListService.getItems();
	      }]
	    }
	  })
        // item details state
        .state('itemDetail',{
            url:'/item-detail/{itemId}',
            templateUrl:'src/shoppinglist/templates/item-detail.template.html',
            controller: 'ItemDetailController as itemdetail',
            resolve:{
                item: ['$stateParams','ShoppingListService', function($stateParams,ShoppingListService){
                        return ShoppingListService.getItems().then(function(items){
                                console.log("Items :", items);
                                console.log("item: ", items[$stateParams.itemId]);
                                return items[$stateParams.itemId];
                        });
                }]
            }
        });
	}


})();
