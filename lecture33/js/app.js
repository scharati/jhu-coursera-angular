(function(){
	angular.module('ShoppingListComponentApp',[])
	.controller('ShoppingListController',ShoppingListController)
	.factory("ShoppingListFactory", ShoppingListFactory)
	.component("shoppingList",{
        templateUrl : 'shoppinglist.html',
        controller: ShoppingListComponentController,
        bindings:{
                items:"<",
                title:"@",
                onRemove:'&'
        }
    })
    .component('loadingSpinner',{
        templateUrl:'spinner.html',
        controller: SpinnerController
    });

    SpinnerController.$inject = ['$rootScope'];

    function SpinnerController($rootScope){
        var $spCtrl = this;
    }

    ShoppingListComponentController.$inject= ['$scope','$element','$q','WeightLossFilterService'];

	function ShoppingListComponentController($scope,$element){
		var sldvm = this;
		console.log("+++ INSIDE DIRECTIVE CONTROLLER +++");
		console.log(sldvm);

		sldvm.CookiesInList = function(){
			for(var i=0; i < sldvm.items.length; i++){
				 var name = sldvm.items[i].name;
				 if(name.toLowerCase().indexOf("cookie") !== -1){
				 	 return true;
				 }
			}

			return false;
		};

        sldvm.remove = function(myIndex){
            sldvm.onRemove({index:myIndex});
        };

        sldvm.$onInit = function(){
            console.log("we are in $onInit()");
        };

        sldvm.$onChanges = function (changeObj){
            console.log("changes :", changeObj);
        }

        sldvm.$postLink = function(){
            $scope.$watch('$ctrl.CookiesInList()', function(newValue,oldValue){
                console.log("+++ inside $postLink: ");
                console.log($element);
                if(newValue === true){
                    // Show warning
                    var warningElem = $element.find('div.error');
                    warningElem.slideDown(900);
                }
                else{
                    // Hide warning
                    var warningElem = $element.find('div.error');
                    warningElem.slideUp(900);
                }
            });
        }

	}

	ShoppingListController.$inject = ['ShoppingListFactory'];

	function ShoppingListController(ShoppingListFactory){
		var slvm = this;
		slvm.itemName = "";
		slvm.itemQuantity = "";

		// use factory to create new shopping list service
		var shoppingList = ShoppingListFactory();

		slvm.items = shoppingList.getItems();

		var origTitle = "Shopping List #1";
		slvm.title = origTitle + " ( " + slvm.items.length + " items )";

		slvm.addItem = function(){
            console.log("+++ addItem() : this is :", this);
			shoppingList.addItem(slvm.itemName, slvm.itemQuantity);
			slvm.title = origTitle + " ( " + slvm.items.length + " items )";
		}

		slvm.removeItem = function(index){
            console.log("+++ removeItem() : this is : ", this);
            this.lastRemoved = this.items[index].name;
			shoppingList.removeItem(index);
			console.log("+++ Title on SLVM +++");
            slvm.title = origTitle + " ( " + slvm.items.length + " items )";
            console.log("slvm is :");
            console.log(slvm);
            console.log("++ Title on this +++");
            this.title = origTitle + " ( " + slvm.items.length + " items )";
		};

	}


	function ShoppingListService(maxItems){
		var service = this;

		// List of shopping items
		var items = [];

		service.addItem = function(itemName, itemQuantity){

			if( (maxItems === undefined ) || maxItems !== undefined && items.length < maxItems){
				var item = {
					name : itemName,
					quantity: itemQuantity
				}

				items.push(item);

			}
			else{
				 throw new Error("Max Items( " + maxItems + ") reached.");
			}

		};

		service.getItems = function(){
			return items;
		};

		service.removeItem = function(index){
			items.splice(index,1);
		};
	}


	function ShoppingListFactory(){
		var factory = function(maxItems){
			return new ShoppingListService(maxItems);
		};

		return factory;
	}

})();
