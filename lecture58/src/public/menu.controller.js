(function(){
	'use strict';

	angular.module('public')
	.controller('MenuController',MenuController);

	MenuController.$inject = ['MenuCategories'];
	function MenuController(MenuCategories){
		var ctrl = this;
		ctrl.menuCategories = MenuCategories;
	}

})();
