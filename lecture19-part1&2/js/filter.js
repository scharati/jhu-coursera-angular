r numberArray = ['1','2','3','4','5','6','7','8','9','10'];
console.log("Number Array : ", numberArray );

function above5Filter(value){
	return value > 5;
}
var filteredArray = numberArray.filter(above5Filter);

console.log("Filtered Array : " + filteredArray);

var shoppingList = ["badanekayi","chavalikayi","savatekayi","bendekayi","yelekosu","hookosu"];

var searchValue = "kayi";

function containsFilter(value){
	return value.indexOf(searchValue) != -1;
}

var searchedShoppingList = shoppingList.filter(containsFilter);
console.log("shoppingList", shoppingList);
console.log("searchedShoppingList", searchedShoppingList);