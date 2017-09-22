(function(){
	angular.module("CounterApp",[])
	.controller("CounterController",counterController);
	counterController.$inject = ['$scope','$timeout'];
	
	function counterController($scope,$timeout){
		$scope.counter = 0;

		// example using $digest()

		// $scope.upCounter = function(){
		// 	setTimeout(function(){
		// 		console.log("+++ inside setTimeOut: using $digest() +++");
		// 		$scope.counter++;
		// 		$scope.$digest();
		// 	},2000);
		// };

		// example using $apply()
		// $scope.upCounter = function(){
		// 	setTimeout(function(){
		// 		console.log("+++ inside setTimeOut: +++");
		// 		$scope.$apply(function(){
		// 			$scope.counter++;
		// 			console.log("+++ using $apply +++");
		// 		});
		// 	},2000);
		// };

		// example using $timeout
		$scope.upCounter = function(){
			console.log("+++ inside setTimeOut: +++");
			$timeout(function(){
				console.log("+++ using $timeout +++");
				$scope.counter++;
			},2000);
		};		


	};

})();