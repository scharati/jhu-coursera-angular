function Person(){
    this.fullName = "myPersonName";
    this.fav = "chakkali";

    this.describe = function(){
        console.log(this);
        console.log(this.fullName + " likes " + this.fav);
    };
}

var myPerson = new Person();
// myPerson.describe();

var describe = myPerson.describe;
describe();
describe.call(myPerson);
