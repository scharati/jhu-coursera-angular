(function (){
	angular.module("DIApp",[])
	//.controller("DIController",[ '$scope','$filter',DIController]);
	 .controller("DIController",DIController);
	 
	 DIController.$inject = ['$scope','$filter'];

	function DIController($scope,$filter){
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

	};
})();

