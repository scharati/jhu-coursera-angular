(function(){
    'use strict';
    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

    function RoutesConfig($stateProvider,$urlRouterProvider){

        console.log("++ inside the RoutesConfig ++");
       // the default routing

       $urlRouterProvider.otherwise("/");

       // state definitions
       $stateProvider

       //home state
       .state('home',{
            url: "/",
            templateUrl:'src/templates/home.template.html'
       })

       // categories state
       // .state('categories',{
       //      url:'/categories',
       //      templateUrl:'src/templates/categories.template.html',
       //      controller: 'CategoriesController as catCtrl',
       //      resolve:{
       //          items : ['MenuDataService', function(MenuDataService){
       //              return MenuDataService.getAllCategories();
       //          }]
       //      }
       // });

       .state('categories',{
            url:'/categories',
            templateUrl:'src/templates/categories.template.html',
       })
       .state('items',{
            url:'/items/{catShortName}',
            templateUrl:'src/templates/item.template.html',
       });

    }

})();
