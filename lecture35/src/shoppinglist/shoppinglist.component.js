(function(){
    'use strict';
    angular.module('ShoppingList')
    .component("shoppingList",{
    templateUrl : 'src/shoppinglist/shoppinglist.template.html',
    controller: ShoppingListComponentController,
    bindings:{
            items:"<",
            title:"@",
            onRemove:'&'
    }
});

    ShoppingListComponentController.$inject= ['$rootScope','$element','$q','WeightLossFilterService'];

    function ShoppingListComponentController($rootScope,$element,$q,WeightLossFilterService){
        var sldvm = this;
        var totalItems;
        console.log("+++ INSIDE COMPONENT CONTROLLER +++");
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
    };

})();
