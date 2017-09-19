(function (){
	'use strict';
	angular.module("calculatorApp",[])
	.controller("calcCtrlr",function($scope){
		$scope.name = "";
		$scope.sum = 0;

		$scope.displaySum = function(){
			var finalSum = calcStringSum($scope.name);
			$scope.sum = finalSum;
		};

		function calcStringSum(string){
			var total = 0;
			for (var i = 0; i < string.length; i++) {
				total +=  string.charCodeAt(i);
			}
			return total;
		};
	})
})();