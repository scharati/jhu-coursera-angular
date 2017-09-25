var parent = {
	value: "parentValue",
	obj: {
		objValue: "parentObjValue"
	},
	walk: function(){
		console.log("Walking !!");
	}
};

var child = Object.create(parent);

console.log(" CHILD-value ", child.value);
console.log("CHILD - objValue ", child.obj.objValue);
console.log("PARENT - value ", parent.value);
console.log("PARENT - objValue ", parent.obj.objValue);
console.log("CHILD :" , child);
console.log("PARENT :", parent);


// changing value on the child

child.value = "childValue";
child.obj.objValue = "childObjValue";

console.log("*** Changed CHILD - value ", child.value);
console.log("*** Changed CHILD - objValue ", child.obj.objValue);
console.log("PARENT - value ", parent.value);
console.log("PARENT -  objValue", parent.obj.objValue);
console.log("CHILD ", child);
console.log("PARENT ", parent);

console.log("child.obj === parent.obj ?", child.obj === parent.obj );


// grandchild

var grandChild = Object.create(child);
console.log("Grandchild : ", grandChild);
grandChild.walk();


// function constructors

function Dog(name){
	this.name = name;
	console.log("this is :", this);
};

var myDog = new Dog("Tikku");
console.log("myDog : ", myDog);

// NOT a function constructor

var otherDog = Dog("Tikku2");
console.log("otherDog : ", otherDog);