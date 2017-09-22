(function(){
	angular.module("BindingApp", [])
	.controller("BindingController",bindingController);
	 bindingController.$inject = ['$scope'];

	 function bindingController($scope){
	 	console.log("+++ in binding controller +++");
	 	$scope.firstName = "first_name";
	 	$scope.showNumberOfWatchers = function(){
	 		console.log("Number of watchers: " +$scope.$$watchersCount);
	 	};

	 	$scope.setFullName = function(){
	 		$scope.fullName = $scope.firstName + " " + "last_Name";
	 	};

	 	$scope.logFirstName = function(){
	 		console.log("FistName is : " + $scope.firstName);
	 	};

	 	$scope.logFullName = function(){
	 		console.log(" Full Name is : " + $scope.fullName);
	 	};

	 };

})();
