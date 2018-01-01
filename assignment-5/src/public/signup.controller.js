(function(){
	'use strict';
	angular.module('public')
	.controller('signUpController',SignUpController);

	SignUpController.$inject = ['$http','myinfoservice'];
	function SignUpController($http,myinfoservice){
		var apiPath = 'https://sch-angular.herokuapp.com';
		var sCtrl = this;
		sCtrl.isValidMenuName = true;
		sCtrl.signup = function(){
			
			sCtrl.isValidMenuName = true;
			console.log("Fav Menu Item: ",sCtrl.favItem);
			$http.get(apiPath+'/menu_items/'+sCtrl.favItem +'.json').then(function(response){
				sCtrl.completed = true;
				sCtrl.isValidMenuName = true;
				var signupDetails = {};
				signupDetails.firstName = sCtrl.firstName;
				signupDetails.lastName = sCtrl.lastName;
				signupDetails.email = sCtrl.email;
				signupDetails.favItemDetails = response.data;

				myinfoservice.setInfo(signupDetails);

			},function(error){
				sCtrl.isValidMenuName = false;
			});
		};

	}

})();
