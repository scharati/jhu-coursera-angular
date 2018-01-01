(function(){
	'use strict';
	angular.module('public')
	.controller('myInfoController',MyInfoController);

	MyInfoController.$inject = ['myinfoservice'];
	function MyInfoController(myinfoservice){
		var ctrl = this;
		var signupDetail =  myinfoservice.getInfo();
		ctrl.signupDetail =signupDetail;
	}

})();