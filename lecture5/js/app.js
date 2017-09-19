(function(){
	'use strict';

	angular.module('myFirstApp', [])
	.controller("MyFirstController", function($scope){
		$scope.name = "Bharat";
		$scope.sayHello = function(){
			return "Hello Coursera!!";
		};
	});
})();