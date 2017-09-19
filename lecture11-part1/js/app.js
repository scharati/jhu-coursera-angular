(function(){
	'use strict';
	angular.module('MsgApp',[])
	.controller('MsgController',MsgController);
	MsgController.$inject = ['$scope'];
	function MsgController($scope){
		$scope.name = "BharatVarsha";

		$scope.sayMessage = function(){
			return "BharatVarsha is an ancient civilization!";
		}
	}
})();