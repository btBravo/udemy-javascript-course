'use strict';

///////////////////////////////////////////////////////////////////////////////
// Default Parameters
console.log('---------- Default Parameters ----------');
///////////////////////////////////////////////////////////////////////////////

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // Old ES5 way of setting default parameters...
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = { flightNum, numPassengers, price };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
// Calculate parameter based on previously defined parameters
createBooking('LH123', 2);
createBooking('LH123', 5);
// To skip a default parameter...
createBooking('LH123', undefined, 1000);

///////////////////////////////////////////////////////////////////////////////
// How passing arguments works: Value vs. Reference
console.log(
  '---------- How passing arguments works: Value vs. Reference ----------'
);
///////////////////////////////////////////////////////////////////////////////

const flight = 'LH234';
const brian = {
  name: 'Brian Thornton',
  passport: 24735579215,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24735579215) {
    //alert('Checked in');
  } else {
    //alert('Wrong passport!');
  }
};

checkIn(flight, brian); // 'Checked in'

console.log(flight); // references primative value in memory. Function created new variable
console.log(brian); // references object in memory. Function changed same object

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(brian); // Function interacts with the same 'brian' object
checkIn(flight, brian); // so now returns 'Wrong passport!'

///////////////////////////////////////////////////////////////////////////////
// Functions Accepting Callback Functions
console.log('---------- Functions Accepting Callback Functions ----------');
///////////////////////////////////////////////////////////////////////////////

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord); // transformer is high-order function; upperFirstWord is callback function
transformer('JavaScript is the best!', oneWord); // transformer is high-order function; oneWord is callback function

const high5 = function () {
  console.log('✋');
};
document.body.addEventListener('click', high5); // addEventListener is high-order function; high5 is callback function

['Jonas', 'Martha', 'Adam'].forEach(high5);

///////////////////////////////////////////////////////////////////////////////
// Functions Returning Functions
console.log('---------- Functions Returning Functions ----------');
///////////////////////////////////////////////////////////////////////////////

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// Above as an arrow function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Brian');
greetArr('Hi')('Jonas');

///////////////////////////////////////////////////////////////////////////////
// The call and apply Methods
console.log('---------- The call and apply Methods ----------');
///////////////////////////////////////////////////////////////////////////////

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Biran Thornton');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // Assigns lufthansa.book method to book creating function call
// book(23, 'Sarah Williams'); // Error because 'this' is now undefined

// To bind the 'this' keyword to the first arguement to call function
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method (used to pass in array of data)
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
// but this is not used anymore because this does the same
book.call(swiss, ...flightData);

///////////////////////////////////////////////////////////////////////////////
// The bind Method
console.log('---------- The bind Method ----------');
///////////////////////////////////////////////////////////////////////////////

// book.call(eurowings, 23, 'Sarah Willimas');

// book.bind(eurowings); // doesn't call the book function but creates a new function with 'this' bound to eurowings

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23); // presets the flightNum parameter
bookEW23('Brian Thornton'); // So all thats needed is name
bookEW23('Linzy Heavenridge');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// Writing event listener below will bind 'this' to the buy button
//    document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// Solution: bind to callback function
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// Same as... addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

// Challenge. Write same addTax function as a function that returns a function
// Does same as above
const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTax2(0.23);
console.log(addVAT2(100));

///////////////////////////////////////////////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
console.log(
  '---------- Immediately Invoked Function Expressions (IIFE) ----------'
);
///////////////////////////////////////////////////////////////////////////////

// Regular function that can be called anytime
const runOnce = function () {
  console.log('This will run whenever called');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
})();

// IIFE as an arrow function
(() => console.log('This will ALSO never run again'))();

///////////////////////////////////////////////////////////////////////////////
// Closures
console.log('---------- Closures ----------');
///////////////////////////////////////////////////////////////////////////////

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
// How does booker (defined globally) have access to passengerCount (defined in secrureBooking scope) although secureBooking is no longer in the stack??
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers

console.dir(booker);

// A function has access to the variable environment (VE) of the execution context in which it was created
// CLOSURE: VE attached to the function, exactly as it was at the time and place the function was created

// A closure is the closed-over variable environment of the execution context in which a function was created, even after that execution context is gone

// A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The fucntion keeps a reference to its out scope, which preserves the scope chain throughout time.

// A closure makes sure that a function doesn't loose connection to variables that existed at the fucntion's birth place.

// A closure is like a backpack that a function carries around wherever it goes. This backpack has all teh variables that were present in the environment where the function was created.

// More closure examples

// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Reassigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
