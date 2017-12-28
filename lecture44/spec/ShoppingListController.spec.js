// describe("ShoppingListController",function(){
// 	beforeEach(module('ShoppingListApp'));

// 	var $controller;
// 	var shoppingListController;

// 	beforeEach(inject(function(_$contrller_){
// 		$contorller = _$controller_;

// 		var shoppingListServiceErrorMock = {};
// 		shoppingListServiceErrorMock.addItem = function(name,quantity){
// 			throw new Error("Test Message");
// 		};
// 		shoppingListServiceErrorMock.getItems = function(){
// 			return null;
// 		};

// 		shoppingListController = $contorller("ShoppingListController",
// 											{shoppingListService:shoppingListServiceErrorMock});;

// 	}));

// 	it("should change error message in cnotroller", function(){
// 		shoppingListController.addItem();
// 		expect(shoppingListController.errorMessage).toBe("Test Message");
// 	});
// });

describe("ShoppingListController", function() {

  beforeEach(module('ShoppingListApp'));

  var $controller;
  var shoppingListController;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    var ShoppingListServiceErrorMock = {};
    ShoppingListServiceErrorMock.addItem = function (name, quantity) {
      throw new Error("Test message.");
    };
    ShoppingListServiceErrorMock.getItems = function () {
      return null;
    };

    shoppingListController =
      $controller('ShoppingListController',
                  {ShoppingListService: ShoppingListServiceErrorMock});

  }));

  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});