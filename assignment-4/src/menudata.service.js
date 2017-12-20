(function(){
  'use strict';

   angular.module('data')
   .service('MenuDataService', MenuDataService);

   MenuDataService.$inject = ['$http','$q'];
   function MenuDataService($http,$q){

    var service = this;

    service.getAllCategories  = function(){

        // this method should return a promise which is a result of using the $http service,
        // using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json

        var deferred  = $q.defer();

        $http({
            method:'GET',
            url:'https://davids-restaurant.herokuapp.com/categories.json'
        }).then(function(result){
            console.log("+++ https://davids-restaurant.herokuapp.com/categories.json +++");
            console.log("categories : ", result);
            deferred.resolve(result);
        },function(error){
            console.log("+++ https://davids-restaurant.herokuapp.com/categories.json +++");
            console.log("error : ", error);
            deferred.reject(error);
        });

        return deferred.promise;
    };


    service.getItemsForCategory = function(categoryShortName){
        var urlBase = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
        var urlFinal = urlBase+categoryShortName;

        var deferred =  $q.defer();

        $http({
            method: 'GET',
            url:urlFinal
        })
        .then(function(result){
            deferred.resolve(result);
        },function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }


   };// MenuDataService ends here

})();
