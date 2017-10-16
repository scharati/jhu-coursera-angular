(function(){
	angular.module("myApp",[])
	.controller('myController', MyController)
	.directive('myDirective',MyDirective);



	function MyDirective(){

	}


	MyController.$inject = [];
	function MyController(){
		var vm = this;
		vm.myWord = "";
		vm.myOppWord = "";
		vm.items =  [];

		vm.addItem = function(){
			var item = {
				word: vm.myWord,
				oppWord:vm.myOppWord
			};
			vm.items.push(item);
		}

		vm.removeItem = function(index){
			if(items){
				items.splice(index,1);
			}
		}

		vm.getItems = function(){
			return vm.items;
		}

	}




})();