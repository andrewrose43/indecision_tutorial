// arguments object is no longer bound with arrow functions! so accessing them will not work
// the this keyword is also no longer bound

const add = (a,b) => {
    //console.log(arguments); 'arguments' does not exist in an arrow function!
    return a+b;
};
console.log(add(55,1));

// this keyword - no longer bound

const user = {
    name: 'Andrew',
    cities: ['Vancouver', 'Victoria', 'Pallet Town'],
    // if printPlacesLived were an arrow function, usage of 'this' would fail. This is because an arrow function does not bind its own 'this' value!
    // and so its 'this' would peer outside the 'user' const into GLOBAL SCOPE looking for the meaning of 'this'
    // printPlacesLived: () => {
    printPlacesLived() {
        // the following 'this' usage is unusable in an arrow function
        console.log(this.name);
        console.log(this.cities);

        //because 'this' will be invisible after another layer of function abstraction, we create a new variable equal to it
        const that = this;

        this.cities.forEach(function(city){
            // console.log(this.name + ' has lived in ' + city); //the instance here of 'this.name' causes an error because this is undefined.
            // this is because the 'this' is only handed down to a function that is an immediate property of the object! and this is a property of a property of the object, so it cannot access 'this'
            console.log(that.name + ' has lived in ' + city); 
        });

        console.log("Part 2: Now with an arrow function");
        //this WILL work, because an arrow function doesn't add that second layer of abstraction
        this.cities.forEach(city => console.log(that.name + " has lived in " + city));

        console.log("Part 3: map");
        // whereas forEach executes a provided function once for each array element,
        // map() creates a NEW ARRAY that is a processed version of the old array.
        /*old:
        const cityMessages = this.cities.map((city) => {
            return this.name + ' has lived in ' + city + '!';
        });
        return cityMessages;
        */
        //new:
        return this.cities.map((city) => this.name + ' has lived in ' + city + '!');
    }
};
console.log(user.printPlacesLived());


// CHALLENGE
/*

*/

const multiplier = {
    //multiplier utility.
    numbers: [1,2,3],
    multiplyBy: 2,
    multiply(){
        return this.numbers.map(number => number * this.multiplyBy);
    }

    //multiply: function returning a new array where the numbers have been multiplied by multiplyBy

};

console.log(multiplier.multiply()); //[1,2,3] 2 >>> [2,4,6]
