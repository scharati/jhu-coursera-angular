(function(){
	'use strict';

	angular.module('common')
	.component('loading',{
		template:'<img src="images/spinner.svg" ng-if="$ctrl.show">',
		controller: LoadingController
	});

	LoadingController.$inject = ['$rootScope'];
	function LoadingController($rootScope){
		var lctrl = this;
		var listener;

		lctrl.$onInit = function(){
			lctrl.show =  false;
			listener = $rootScope.$on('spinner:activate',onSpinnerActivate);
		};

		lctrl.$onDestroy = function(){
			listener();
		};

		function onSpinnerActivate(event,data){
			lctrl.show = data.on;
		};
	}

})();