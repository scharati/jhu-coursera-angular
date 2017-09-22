(function(){
	angular.module("CounterApp",[])
	.controller("CounterController",counterController);

	counterController.$inject = ['$scope'];
	function counterController($scope){

		$scope.onceCounter = 0;
		$scope.counter = 0;

		$scope.showNumberOfWatchers = function(){
			console.log("# of watchers:")
			console.log($scope.$$watchersCount);
		};

		$scope.countOnce = function(){
			console.log("+++ in countOnce start +++");
			$scope.onceCounter = 1;
			console.log("+++ in countOnce end +++");
		};

		$scope.upCount = function(){
			$scope.counter++;
		};

		// way to hook on to the Digest loop

		$scope.$watch(function(){
			console.log("Digest loop fired!!");
		});

		// Manual watchers:
		// $scope.$watch('onceCounter',function(newValue,oldValue){
		// 	console.log("onceCounter : old value : " +oldValue);
		// 	console.log("onceCounter : new value :" + newValue)
		// });


		// $scope.$watch('counter',function(newValue,oldValue){
		// 	console.log("counter :old value : " +oldValue);
		// 	console.log("counter :new value :" + newValue);
		// 	var counterDiv = window.document.querySelector("#counterID");
		// 	counterDiv.textContent = $scope.counter;
		// 	console.log(counterDiv);
		// });		
	}


})();