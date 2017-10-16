(function(){
    angular.module('NarrowItDownApp',[])
    .controller("NarrowItDownController",NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems',FoundItemsDirective);

    function FoundItemsDirective(){
        var ddo = {
            templateUrl: 'founditems.html',
            scope:{
                items : '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'dCtrl',
            bindToController: true
        };


        return ddo;
    }


    function FoundItemsDirectiveController(){

    }


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService){
        var vm = this;
        vm.searchString = "";
        // vm.found = "";
        vm.error = "";

        vm.narrowItDown = function(){

            console.log("vm.searchString being passed : ", vm.searchString);
            var response = MenuSearchService.getMatchedMenuItems(vm.searchString);

            response.then(function(items){
                console.log("response is :");
                console.log(items);
                vm.found = items;
            }).catch(function(response){
                vm.error="terror !!!!";
            });

        };

        vm.removeMatchItem = function(index){
            console.log("+++ inside removeMatchItem +++");
            if(index && vm.found){
                vm.found.splice(index,1);
            }
        }

    }

    MenuSearchService.$inject = ['$http','$q'];

    function MenuSearchService($http,$q){
        var service = this;

        var getMenuItems = function(){
            return $http({
                method: 'GET',
                url:'https://davids-restaurant.herokuapp.com/menu_items.json'
            });
        };

        service.getMatchedMenuItems = function(searchTerm){

            console.log("++++ getMatchedMenuItems:searchTerm is : ", searchTerm);
            var deferred = $q.defer();

            var response = getMenuItems();
            response.then( function(response){
                var items = response.data;
                var matchItems = [];
                console.log("menu_items");
                console.log(items.menu_items);
                var items1 = items.menu_items;
                console.log("length :" , items1.length);
                console.log("first item :", items1[0]);
                for(var idx = 0; idx < items1.length; idx++){
                    var curItem = items1[idx];
                    console.log("curItem.description is: ", curItem.description);
                    console.log("****** searchTerm called is :", searchTerm);
                    if(curItem.description.indexOf(searchTerm) !== -1){
                        matchItems.push(curItem);
                        console.log("curItem : " , curItem);
                    }
                }

                console.log("matchItems :");
                console.log(matchItems);

                deferred.resolve(matchItems);

            }).catch(function(response){
                var matchItems = [];
                deferred.reject(matchItems);
            });

            return deferred.promise;
        }

    }
})();
