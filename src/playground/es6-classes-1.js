// Classes are like blueprints for reusing code multiple times!

class Person {
    constructor(name = 'Anonymous', age = 0) {
        this.name = name || 'test'; //test if no name provided (overridden by Anonymous here)
        this.age = age;
    }
    getGreeting(){
        // return 'Hi, my name is ' + this.name + "!";
        return `Hi, my name is ${this.name}!`; //template strings! Woo! Way cleaner
    }
    getDescription(){
        return `${this.name} is ${this.age} years old.`;
    }
}

class Student extends Person {
    constructor(name, age, major = 'Undeclared') {
        super(name, age);
        this.major = major;
    }
    hasMajor(){
        return !!this.major; //flipping Undefined twice turns it into False. Sneaky.
    }
    getDescription(){
        let description = super.getDescription();
        if (this.hasMajor()) {
            description += ` Their major is ${this.major}.`;
        }
        return description;
    }
}

// const other = new Student('Mickey Mouse', 99, 'Biology');
// console.log(other.getGreeting());
// console.log(other.getDescription());
// console.log(other.hasMajor());

class Traveller extends Person {
    constructor(name, age, homeLocation = 'Eden'){
        super(name, age);
        this.homeLocation = homeLocation;
    }
    hasHomeLocation(){
        return !!this.homeLocation;
    }
    getGreeting(){
        let greeting = super.getGreeting();
        if (this.hasHomeLocation()){
            greeting += ` I live in ${this.homeLocation}.`
        }
        return greeting;
    }
}

const lonk = new Traveller('Link', 9001, 'Hyrule');
console.log(lonk.getGreeting());