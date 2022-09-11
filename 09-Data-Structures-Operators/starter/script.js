'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tues', 'wed', 'thurs', 'fri'];

const openingHours = {
  // 'thurs' set with Enhanced Object Literals
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals copies outer object into this object
  openingHours,

  // Method for destructing arrays
  // Enhanced object literals allow function to be typed like this...
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Method for destructing objects
  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  // Method for spread operator
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  // Method for Rest pattern
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// Destructuring Arrays
// const arr = [2, 3, 4];
// // Old way
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// // Better way
// const [x, y, z] = arr; // Destructuring (Need to use const)
// console.log(x, y, z); // 2, 3, 4
// console.log(arr); // Array still intact

// // const [first, second] = restaurant.categories;
// // // const [first, , second] = restaurant.categories;
// // console.log(first, second);

// let [main, , secondary] = restaurant.categories;
// // const [first, , second] = restaurant.categories;
// console.log(main, secondary);

// // Old way of switching variables
// let temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// // Better way of switching variables
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// // Receive 2 return values from a function...
// // order: function (starterIndex, mainIndex) {
// //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
// // }
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// // console.log(i, j); // 2, [5, 6]

// const [i, , [j, k]] = nested;
// console.log(i, j, k); // 2, 5, 6

// // Default values
// // const [p, q, r] = [8, 9];
// // console.log(p, q, r); // 8, 9, undefined
// // // can set default values for empty variables
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r); // 8, 9, 1

//////////////////////////////////////////
// Destructuring Objects

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // To changes the names
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // Default values for items that don't exist
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating Variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj); // Wrap in parenthesis
// console.log(a, b);

// // Nested objects
// const {
//   fri: { open, close },
// } = restaurant.openingHours;
// console.log(open, close);

// const {
//   fri: { open: o, close: c },
// } = restaurant.openingHours;
// console.log(o, c);

// // Method from object above
// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// //////////////////////////////////////
// // Spread operator {...}
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// const goodNewArr = [1, 2, ...arr];
// console.log(goodNewArr);

// console.log(...goodNewArr);

// // Add item to existing array
// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Copy array
// const mainMenuCopy = [...restaurant.mainMenu];

// // Join 2 arrays
// const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// // Works on all iterables: arrays, strings, maps, sets (NOT objects)
// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);

// // Real world example
// const ingredients = [
//   // prompt("Let's make pasta! Ingredient 1?"),
//   // prompt('Ingredient 2?'),
//   // prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// // Adding new items to object
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// // Copying an object
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

////////////////////////////////////////
// Rest Pattern and Parameters (Opposite of Spread Operator: Put elements into an array)

// // 1) Destructuring
// // SPREAD, because on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// // 2) Functions
// const add = function (...numbers) {
//   console.log(numbers);
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// }; // Takes any amount of numbers and puts them in an array
// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [23, 5, 7];
// add(...x);

// // Method from object above
// restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

// ///////////////////////////////////////////////////////////////
// // Short Circuiting (&& and ||)
// // Use ANY data type, return ANY data type, short-circuiting

// // || operator will return first truthy value of all operands or the last value if all are falsy
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);
// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// // Using || short-circuiting instead of terniary operator
// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10; // Which ever side is truthy will log
// console.log(guests2);

// // && operator will return first falsy value of all operands or the last value if all are truthy
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');
// console.log('Hello' && 23 && null && 'Jonas');

// // Example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushroom', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushroom', 'spinach');

// /////////////////////////////////////////////////////////////////////
// // Nullish Coalescing Operator
// restaurant.numGuestsZero = 0;
// const guests3 = restaurant.numGuestsZero || 10; // This will log 10 if numGuests is 0 (falsy)
// console.log(guests3);
// // Solution... Nullish: null and undefined (NOT 0 or '')
// const guests4 = restaurant.numGuestsZero ?? 10; // Will only return null or undefined, so 0 logs in this case
// console.log(guests4);

// //////////////////////////////////////////////////////////
// // Logical Assignment Operators

// const rest1 = {
//   name: 'Capri',
//   numGuests: 20,
// };
// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// // Adding a variable if it doesn't exist using || operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// // Can also be done with OR assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// // If numGuests is 0... Nullish Assignment Operator
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

///////////////////////////////////////////////////////////////////////

// Looping Arrays: The for-of Loop

///////////////////////////////////////////////////////////////////////

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);
// // // To get index of each item
// // for (const item of menu.entries()) {
// //   console.log(`${item[0] + 1}: ${item[1]}`);
// // };
// // // ...is the same as... (destructer array in for of Loop)
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// ///////////////////////////////////////////////////////////////////

// // Optional Chaining

///////////////////////////////////////////////////////////////////////

// // console.log(restaurant.openingHours.mon); // undefined
// // console.log(restaurant.openingHours.mon.open); // Error (open property on undefined)

// // console.log(restaurant.openingHours.mon?.open); // undefined. only reads last property if previouos properties exist. Stops at undefined property.
// // // Can have multiple uses
// // console.log(restaurant.openingHours?.mon?.open);

// // example
// const days = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];
// for (const day of days) {
//   // console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day} we open at ${open}`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // Arrays
// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

// console.log(users[0]?.name ?? 'User array empty');

// // Looping Objects
// // for (const day of Object.keys(openingHours)) {
// //   console.log(day);
// // };

// // Property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties);
// console.log(`We are open on ${properties.length} days`);

// for (const day of properties) {
//   console.log(day);
// }

// let openStr = `We are open on ${properties.length} days: `;
// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // Entire object
// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

///////////////////////////////////////////////////////////////////////

// Sets

// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet); // {'Pasta', 'Pizza', 'Risotto'}   (No duplicates)

// console.log(new Set('Brian')); // {"B", "r", "i", "a", "n"}

// // Get size of set
// console.log(ordersSet.size); // 3

// // See if item exist in a set
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));

// // Add item to a set
// ordersSet.add('Garlic Bread');

// // Delete item from a set
// ordersSet.delete('Risotto');
// console.log(ordersSet);

// // To empty a set
// // ordersSet.clear();

// for (const order of ordersSet) console.log(order);

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = [...new Set(staff)]; // Creates an array from the set items
// console.log(staffUnique);

// // To find number of unique items
// console.log(new Set('brianlynnthornton').size); // 10 unique letters

// //////////////////////////////////////////////////////////////////////

// // Maps

// ///////////////////////////////////////////////////////////////////////

// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal'));

// // set method retunr entire new Map and can be chained
// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open!')
//   .set(false, 'We are closed!');
// console.log(rest);

// // Extract data from Map
// console.log(rest.get('name'));
// console.log(rest.get(true));

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// // rest.clear();

// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);

// /////////////////////////////////////////////////////////////////////////

// // Maps: Iteration

// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct!'],
//   [false, 'Try again!'],
// ]);
// console.log(question);

// // Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Quiz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Annswer ${key}: ${value}`);
// }
// // const answer = Number(prompt('Your answer'));
// // console.log(answer);
// // console.log(question.get(question.get('correct') === answer));

// // Convert map to array
// console.log([...question]);

// console.log(question.entries());
// console.log(question.keys());
// console.log([...question.keys()]);
// console.log(question.values());
// console.log([...question.values()]);

////////////////////////////////////////////////////////////////////////////

// Working with Strings

////////////////////////////////////////////////////////////////////////////

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

// Extract first word
console.log(airline.slice(0, airline.indexOf(' ')));
// Extract last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😒');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAs';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replaceAll('door', 'gate'));
// Using regular expression (before replaceAll existed)
// console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('Air'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of new Airbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food, and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

console.log('a+very+nice+string'.split('+'));
console.log('Brian Thornton'.split(' '));

const [firstName, lastName] = 'Brian Thornton'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // Another way...
    // namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('brian thornton');

// Padding

const message = 'Go to gate 23';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Brian'.padStart(25, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + ''; // Another way of converting number to a string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(4125476357845216));
console.log(maskCreditCard('6515874516514894651328'));

// Repeat
const message2 = 'Bad weather... All departures delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);

///////////////////////////////////////

// String Methods Practice
console.log('----------String Methods Practice----------');

////////////////////////////////////////

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} ${time.replace(':', 'h')}`.padStart(50);
  console.log(output);
}
