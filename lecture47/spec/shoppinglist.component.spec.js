describe("shopping list component", function(){
	//load the module which contains the component
	beforeEach(module('ShoppingListComponentApp'));
	var $componentController;

	// get the component controller
	beforeEach(inject(function(_$componentController_){
		$componentController = _$componentController_;
	}));

	it('should detect no cookies in the list', function(){
		// pass bindings that are needed for the test
		var bindings = {items: [{name: "item1", quantity:"1"}]};
		var ctrl = $componentController('shoppingList',{$element:null},
			bindings);
		var cookiesInList = ctrl.cookiesInList();
		expect(cookiesInList).toEqual(false);
	});

	it('should detect cookies in the list',function(){
		var bindings = {items :[{name:"cookie",quantity:"8"}]};
		var ctrl = $componentController('shoppingList',{$element:null},
			bindings);
		var cookiesInList = ctrl.cookiesInList();
		expect(cookiesInList).toEqual(true);
	});
});