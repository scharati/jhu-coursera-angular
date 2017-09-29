(function(){
	'use strict';
	 angular.module('LunchCheck',[])
	 .controller('LunchCheckController',LunchCheckController);

	 LunchCheckController.$inject = ['$scope'];
	 function LunchCheckController($scope){
	 	$scope.message = "";
	 	$scope.items = "";

	 	$scope.performCheck = function(){
	 		// check for no data entered
	 		if($scope.items === undefined || $scope.items === null || $scope.items === ""){
	 			$scope.message = "Please enter data first";
	 		}


	 		var itemsList = $scope.items.split(",");
	 		var nonEmptyItemList = [];

	 		for(var item in itemsList){
	 			if(itemsList[item] !== ""){
	 				nonEmptyItemList.push(itemsList[item]);
	 			}
	 		}	
	 		// Under limit check
	 		if(nonEmptyItemList.length <= 3){
	 			$scope.message = "Enjoy!"
	 		}// Over limit check
	 		else{
	 			$scope.message = "Too Much!"
	 		}
	 	}
	 };
})();
