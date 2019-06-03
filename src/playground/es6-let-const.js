var nameVar = 'Andrew';
var nameVar = 'Mike';
console.log('nameVar', nameVar);

//let CAN be reassigned. But unlike var, it can't be declared redundantly
let nameLet = "Jen";
nameLet = 'Jenniferette';
console.log('nameLet', nameLet);

//const CANNOT be reassigned
const nameConst = "Frank";
console.log("nameConst", nameConst);

function getPetName(){
    const petName = 'Hal';
    return petName;
}

console.log(getPetName());

const fullName = 'Hello world';
// note that fullName is then accessible everywhere
if (fullName){
    let firstName = fullName.split(' ')[0];
    console.log(firstName);
}