(function(){
	'use strict';
	angular.module('MsgApp',[])
	.controller('MsgController',MsgController)
	.filter('desha',deshaFltrs)
	.filter('truth',truthFactory);
	MsgController.$inject = ['$scope','$filter','deshaFilter'];
	function MsgController($scope,$filter,deshaFilter){
		$scope.name = "BharatVarsha";
		$scope.cookieCost = .45;

		console.log("The custom filter :"  + deshaFilter);

		$scope.sayMessage = function(){
			var msg = "BharatVarsha is an ancient civilization!";
			var output = $filter('uppercase')(msg);
			return output;
		}

		$scope.sayDeshaMessage = function(){
			var msg = "BharatVarsha is an ancient civilization!";
			var output = deshaFilter(msg);
			console.log("Desha Message :"  + output);
			return output;
		}

	}

	function deshaFltrs(){
		return function(input){
			console.log("input: " + input );
				if(input){
				var output = input.replace('Varsha','Desha');
				console.log("output: " + output );
				return output;
			}
			return "";
		};
	}

	function truthFactory(){
		return function(input,source,target){
			input = input || "";
			var output = input.replace(source,target);
			return output;
		};
	}
})();