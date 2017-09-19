(function (){
	angular.module("DIApp",[])
	.controller("DIController", function($scope,$filter,$injector){
		$scope.name = "";

		$scope.upper = function(){
			var upString = toUpper($scope.name);
			$scope.name = upString;
		};

		function toUpper(string){
			console.log("toUpper:" + $scope.name);
			console.log("toUpper:" + $filter('uppercase'));
			return $filter('uppercase')($scope.name);
		}

		var deps = $injector.annotate(toUpper);
		console.log("deps: " + deps);
	});
})();