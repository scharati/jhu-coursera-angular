describe("testing shoppingList directive",function(){
	var $compile;
	var $rootScope;

	// var expectedHtml = '<h3 class="ng-binding">test title</h3> \
	//  <ol>\
	// 	<!-- ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope">\
	// 		1 of item1 \
	// 		<button ng-click="list.removeItem($index);"> \
	// 			Remove Item\
	// 		</button> \
	// 	</li><!-- end ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope">\
	// 		2 of item2 \
	// 		<button ng-click="list.removeItem($index);"> \
	// 			Remove Item \
	// 		</button> \
	// 	</li><!-- end ngRepeat: item in list.items --> \		
	// </ol>'.replace('/\s/g','');

	  var expectedHtml = '<h3 class="ng-binding">test title</h3>\
  <ol>\
    <!-- ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope"> \
      1 of item 1 \
      <button ng-click="list.removeItem($index);">Remove Item</button> \
    </li><!-- end ngRepeat: item in list.items --><li ng-repeat="item in list.items" class="ng-binding ng-scope"> \
      2 of item 2 \
      <button ng-click="list.removeItem($index);">Remove Item</button> \
    </li><!-- end ngRepeat: item in list.items --> \
  </ol>'.replace(/\s/g, ''); // removes spaces

	beforeEach(module('ShoppingListDirectiveApp'));

	beforeEach(inject(function(_$compile_,_$rootScope_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;

	}));

	beforeEach(inject(function($templateCache){
		var directiveTemplate = null;
		var req = new XMLHttpRequest();
		req.onload = function(){
			directiveTemplate = this.responseText;
		};

		req.open("get","shoppinglist.html",false);
		req.send();
		$templateCache.put('shoppinglist.html',directiveTemplate);
	}));

	it("replaces the shoppinglist directive with correct content", function(){
		var list = {};
		list.items = [
			{name:"item1",quantity:"1"},
			{name:"item2",quantity:"2"}
		];
		$rootScope.list = list;

		// get the usage of shoppinglist and compile it into an element

		var html = "<shopping-list my-list='list' title='test title'>  </shopping-list>";
		var element = $compile(html)($rootScope);

		//fire the digestCycle so that all expressions are evaluated
		$rootScope.$digest();

		console.log("Expected : " , expectedHtml);
		console.log("current :", (element.html()).replace('/\s/g',''));
		// Check that compiled element contains the appropriate content
		// expect((element.html()).replace('/\s/g','')).toContain(expectedHtml);

		expect(element.html().replace(/\s/g, '')).toContain(expectedHtml);

	});
});