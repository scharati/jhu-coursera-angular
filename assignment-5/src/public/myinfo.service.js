(function(){
	'use strict';
	angular.module('public')
	.service('myinfoservice',MyInfoService);

	var myInfo = {};
	// MyInfoService.$inject = [];
	function MyInfoService(){
		var service = this;

		service.setInfo = function(signUpDetails){
			myInfo.value = signUpDetails;
		};

		service.getInfo = function(){
			var val = myInfo.value;
			return myInfo.value;
		}

	}

})();