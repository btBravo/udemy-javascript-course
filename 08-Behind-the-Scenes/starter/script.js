'use strict';

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     const output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       const firstName = 'Steven'; // Okay to have same variable name in child scope. This will be logged in str below
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }

//       // output = 'NEW OUTPUT';   This will change assignment to output in parent scope
//       // const = 'NEW OUTPUT';    This will create a new variable and not change output in parent scope
//     }
//     // console.log(str);  undefined
//     console.log(millenial); // defined because of use of var
//     // add(2, 3);  undefined (only in strict mode)
//   }
//   printAge();
//   return age;
// }

// const firstName = 'Brian';
// calcAge(1991);
// // console.log(age);  undefined
// // printAge();  undefined

// ///////////////////////////////////////////
// //  Hoisting and Temporal Dead Zone (TDZ)

// var me = 'Brian';
// let job = 'coder';
// const year = 1991;

// console.log(addDecl(2, 3));
// // console.log(addExpr(2, 3));  Cannot access 'addExpr' before initialization
// // console.log(addArrow(2, 3));  addArrow is not a function

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// // Why not to use var
// if (!numProducts) deleteShoppingCart(); // var hoisted as undefined at this line

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// } //  Logs All products deleted although numProducts is 10 (var hoisted as undefined)

// var x = 1; // x created on window object
// let y = 2; // not created on window object
// const z = 3; //  not created on window object

// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);

///////////////////////////////////
// this keyword

// console.log(this); // window object

// const calcAge = function (birthYear) {
//   const age = 2037 - birthYear;
//   console.log(this); //  undefined
// };
// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   const age = 2037 - birthYear;
//   console.log(this); //  window (arrow function doesn't get 'this')
// };
// calcAgeArrow(1980);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this); // jonas object
//     console.log(2037 - this.year);
//   },
// };
// jonas.calcAge();

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jonas.calcAge; //  method borrowing
// matilda.calcAge(); // this keyword points to object calling the method

// const f = jonas.calcAge;
// f(); // undefined. there is no object owner of this function

// var firstName = 'Matilda'; // creates firstName on window object

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(this); // jonas object
//     console.log(2037 - this.year);

//     // // Solution 1
//     // const self = this;
//     // const isMillenial = function () {
//     //   console.log(self.year >= 1981 && self.year <= 1996); // This will work, self defined outside of function
//     //   console.log(this.year >= 1981 && this.year <= 1996); // Regular function call, 'this' is undefined
//     // };

//     // Solution 2
//     const isMillenial = () => {
//       console.log(this.year >= 1981 && this.year <= 1996); // 'this' inherited from parent scope due to arrow function use
//     };

//     isMillenial();
//   },

//   greet: () => console.log(`Hey ${this.firstName}`), // Hey Matilda (arrow does't get 'this'; fistName on window object is Matilda)
// };
// jonas.greet();
// jonas.calcAge(); // year is undefined

// // arguments property
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 3);
// addExpr(2, 3, 8, 12); // this is allowed, extra arguments get added to arguments array

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 3, 8, 12); // arguments undefined. arrow function does not get argument property

///////////////////////////////
// Primitives vs Objects

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName); // Davis Williams

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage: ', jessica); // lastName: Davis
console.log('After marriage: ', marriedJessica); // lastName: Davis

// marriedJessica = {}; // not allowed

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2); // Copies propeties to new object (shallow copy, not a deep clone)
jessicaCopy.lastName = 'Davis';
console.log('Before marriage: ', jessica2); // lastName: Williams
console.log('After marriage: ', jessicaCopy); // lastName: Davis

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

// Because shallow copy doesnt copy second level objects
console.log('Before marriage: ', jessica2); // family: ['Alice', 'Bob', 'Mary', 'John']
console.log('After marriage: ', jessicaCopy); // family: ['Alice', 'Bob', 'Mary', 'John']
