(function(){
    angular.module('RoutingApp',['ui.router']);

    angular.module('RoutingApp')
    .config(RoutesConfig);

     RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

     function RoutesConfig($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/tab1');

        $stateProvider.state('view1',{
            url:'/tab1',
            template: '<div>This is Tab1</div>'
        })
        .state('view2',{
            url:'/tab2',
            templateUrl: 'src/tab2.html'
        });
     }

})();
