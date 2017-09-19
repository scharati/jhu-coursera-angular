(function(){
	'use strict';
	angular.module('MsgApp',[])
	.controller('MsgController',MsgController);
	MsgController.$inject = ['$scope','$filter'];
	function MsgController($scope,$filter){
		$scope.name = "BharatVarsha";
		$scope.cookieCost = .45;

		$scope.sayMessage = function(){
			var msg = "BharatVarsha is an ancient civilization!";
			var output = $filter('uppercase')(msg);
			return output;
		}
	}
})();