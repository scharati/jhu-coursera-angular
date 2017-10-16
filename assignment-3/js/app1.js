(function(){
    angular.module('NarrowItDownApp',[])
    .controller("NarrowItDownController",NarrowItDownController)
    .service('MenuSearchService', MenuSearchService);

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService){
        var vm = this;
        vm.searchString = "";
        vm.found = "";
        vm.error = "";

        vm.narrowItDown = function(){
            var response = MenuSearchService.getMenuItems();

            response.then(function(response){
                vm.found = response.data;
            });

        };

    }

    MenuSearchService.$inject = ['$http','$q'];

    function MenuSearchService($http,$q){
        var service = this;


        service.getMatchedMenuItems = function(searchTerm){

            var response = getMenuItems();

            response.then(function(){
                var items = response.data;
                var matchItems = [];
                for(var idx = 0; idx < items.length; idx++){

                    var curItem = items[idx];

                    if(curItem.description.indexOf(searchTerm) !== -1){
                        matchItems.push(item);
                    }
                }
            })
            .catch(function(){
                return [];
            });
        }

        var getMenuItems = function(){
            return $http({
                method: 'GET',
                url:'https://davids-restaurant.herokuapp.com/menu_items.json'
            });
        };

    }




})();
