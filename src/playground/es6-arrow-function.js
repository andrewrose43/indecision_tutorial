function square(x){
    return x*x;
};

//correct but verbose arrow function
//const squareArrow = (x) => {
//    return x*x;
//};

//So what's so great about arrow functions?
//answer: you can make them nice and small without an explicit return statement

const squareArrow = (x) => x*x;

console.log(square(5));
console.log(squareArrow(7));

/*
Challenge: use arrow functions
getFirstName
*/

const theName = 'Hugo Leclercq';
//const getFirstName = (fullName) => {
//    return fullName.split(' ')[0];
//}
const getFirstName = (fullName) => fullName.split(' ')[0];
console.log(getFirstName(theName));
