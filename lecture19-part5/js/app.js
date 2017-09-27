(function(){
	'use strict';
	angular.module("ControllerApp",[])
	.controller("ParentController1",parentController1)
	.controller("ChildController1",childController1)
	.controller("ParentController2",parentController2)
	.controller("ChildController2",childController2);

	parentController1.$inject = ['$scope'];
	function parentController1($scope){
		// $scope.parentValue = 1;
		// $scope.pc = this;
		// $scope.pc.parentValue = 1;
	}

	childController1.$inject = ['$scope'];
	function childController1($scope){
		// console.log("$scope.parentValue: ", $scope.parentValue);
		// console.log("CHILD $scope ",$scope);

		// $scope.parentValue = 5;
		// console.log("*** CHANGED : $scope.parentValue = 5 ****");
		// console.log("$scope.parentValue : ", $scope.parentValue);
		// console.log($scope);

		// console.log("$scope.pc.parentValue :", $scope.pc.parentValue);
		// $scope.pc.parentValue = 5;
		// console.log("** CHANGED : $scope.pc.parentValue = 5; ***");
		// console.log("$scope.pc.parentValue : ", $scope.pc.parentValue);
		// console.log("$scope :", $scope);
	}

	// Controller As syntax
	parentController2.$inject = ['$scope'];
	function parentController2($scope){
		var pvm = this;
		pvm.value = 1;
	}

	childController2.$inject = ['$scope'];
	function childController2($scope){
		var cvm = this;
		cvm.value = 5;
		console.log("ChildController2 $scope : ",$scope);
	}

})();
