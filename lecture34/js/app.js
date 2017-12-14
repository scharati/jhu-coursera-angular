(function(){
	angular.module('ShoppingListEventsApp',[])
	.controller('ShoppingListController',ShoppingListController)
	.factory("ShoppingListFactory", ShoppingListFactory)
    .service("WeightLossFilterService",WeightLossFilterService)
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
        templateUrl: 'spinner.html',
        controller:SpinnerController
    });


    SpinnerController.$inject = ['$rootScope'];

    function SpinnerController($rootScope){
        var spCtrl = this;

        var cancelListener = $rootScope.$on('shoppinglist:processing', function(event,data){
            console.log("Event: ", event);
            console.log("Data :", data);

            if(data.on){
                spCtrl.showSpinner = true;
            }
            else{
                spCtrl.showSpinner = false;
            }
        });

        spCtrl.$onDestroy = function(){
            cancelListener();
        }
    };


    ShoppingListComponentController.$inject= ['$rootScope','$element','$q','WeightLossFilterService'];

	function ShoppingListComponentController($rootScope,$element,$q,WeightLossFilterService){
		var sldvm = this;
        var totalItems;
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
            totalItems = 0;
        };

        sldvm.$onChanges = function (changeObj){
            console.log("changes :", changeObj);
        };

        sldvm.$doCheck = function(){
            if(sldvm.items.length !== totalItems){
                totalItems = sldvm.items.length;

                $rootScope.$broadcast('shoppinglist:processing',{on:true});

                var promises = [];

                for(var i=0; i < sldvm.items.length; i++){
                    promises.push(WeightLossFilterService.checkName(sldvm.items[i].name));
                }

                $q.all(promises)
                .then(function(result){
                    // remove cookie warning
                    var warningElem = $element.find('div.error');
                    warningElem.slideUp(900);
                })
                .catch(function(result){
                    // show cookie warning
                    var warningElem = $element.find('div.error');
                    warningElem.slideDown(900);
                })
                .finally(function(){
                    $rootScope.$broadcast('shoppinglist:processing',{on:false});
                });

            }
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

    WeightLossFilterService.$inject = ['$q','$timeout'];

    function WeightLossFilterService($q,$timeout){
        var service = this;

        service.checkName = function(name){
            var deferred = $q.defer();

            var result = {
                message : ""
            };

            $timeout(function(){
                // check for cookies
                if(name.toLowerCase().indexOf('cookie') === -1){
                    deferred.resolve(result);
                }
                else{
                    result.message = "stay away from cookies!!!!!!!";
                    deferred.reject(result);
                }
            },3000);

            return deferred.promise;
        };

        service.checkQuantity = function(quantity){
            var deferred = $q.defer();
            var result = {
                message: ""
            };

            $timeout(function(){
                // check for too many boxes
                if(quantity < 6){
                    deferred.resolve(result);
                }
                else{
                    result.message = "That's too much !!!!!";
                    deferred.reject(result);
                }
            },1000);

            return deferred.promise;
        };

    }


})();
