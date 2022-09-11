'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; // Slice creates copy so array isnt mutated by sort

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2)); // ['c', 'd', 'e']
// console.log(arr.slice(2, 4)); // ['c', 'd']
// console.log(arr.slice(-2)); // ['d', 'e']
// console.log(arr.slice(-1)); // gives last element of an array ['e']
// console.log(arr.slice(1, -2)); // ['b', 'c']
// console.log(arr.slice()); // Make shallow copy of entire array
// console.log([...arr]); // Other way to make shallow copy

// // SPLICE
// // Works like slice but mutates the original array
// // console.log(arr.splice(2));
// arr.splice(-1); // To remove last element from an array
// console.log(arr);
// arr.splice(1, 2); // Start at index 1 and remove 2 elements
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // Mutates original array
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); // Same as concat

// // JOIN
// console.log(letters.join(' - '));

// // THE NEW at METHOD

// const arr3 = [23, 11, 64];
// console.log(arr3[0]);
// console.log(arr3.at(0));

// // getting last array element
// console.log(arr3[arr.length - 1]);
// console.log(arr3.slice(-1)[0]);
// console.log(arr3.at(-1));

// // Also works on strings
// console.log('jonas'.at(0));
// console.log('jonas'.at(-1));

///////////////////////////////////////////////////////////////////////////
// Looping Arrays: forEach()
console.log('---------- Looping Arrays: forEach() ----------');
///////////////////////////////////////////////////////////////////////////

// // Using for of Loop
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }
// // or...
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// // Using forEach()
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });
// // or...
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

///////////////////////////////////////////////////////////////////////////
// forEach() with Maps and Sets
console.log('---------- forEach() with Maps and Sets ----------');
///////////////////////////////////////////////////////////////////////////

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// }); // Value and key are the same for Sets

///////////////////////////////////////////////////////////////////////////
// The map Method
console.log('---------- The map Method ----------');
///////////////////////////////////////////////////////////////////////////

// const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
// // As an arrow function
// // const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsDescriptions = movements.map((mov, i, arr) => {
//   if (mov > 0) {
//     return `Movement ${i + 1}: You deposited ${mov}`;
//   } else {
//     return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
//   }
// });
// console.log(movementsDescriptions);

///////////////////////////////////////////////////////////////////////////
// The filter Method
console.log('---------- The filter Method ----------');
///////////////////////////////////////////////////////////////////////////

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

///////////////////////////////////////////////////////////////////////////
// The reduce Method
console.log('---------- The reduce Method ----------');
///////////////////////////////////////////////////////////////////////////

// const balance = movements.reduce(function (accumulator, current, index, array) {
//   return accumulator + current;
// }, 0); // Initial value of accumulator
// console.log(balance);

// // Same as...
// // const balance = movements.reduce((acc, curr) => accu + curr, 0);

// // Maximum Value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

///////////////////////////////////////////////////////////////////////////
// The Magic of Chaining Methods
console.log('---------- The Magic of Chaining Methods ----------');
///////////////////////////////////////////////////////////////////////////

// const eurToUsd = 1.1;

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

///////////////////////////////////////////////////////////////////////////
// The find Method
console.log('---------- The find Method ----------');
///////////////////////////////////////////////////////////////////////////

// const firstWithdrawal = movements.find(mov => mov < 0);
// // Only returns first element that meets test
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

///////////////////////////////////////////////////////////////////////////
// some And every
console.log('---------- some And every ----------');
///////////////////////////////////////////////////////////////////////////

console.log(movements);
// Checks for EQUALITY
console.log(movements.includes(-130));

// SOME: Checks for CONDITION of ANY element
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY: Checks for CONDITION for EVERY element
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0));
true;

// Seperate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////////////////////////////////////////
// flat and flatMap
console.log('---------- flat and flatMap ----------');
///////////////////////////////////////////////////////////////////////////

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

// // Only goes one level deep
// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat()); // [[1, 2], 3, 4, [5, 6], 7, 8]
// // Solution: use 'depth' operator
// console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((accum, mov) => accum + mov, 0);
// console.log(overallBalance);

// // Above with chaining...
// const overallBalanceChained = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((accum, mov) => accum + mov, 0);
// console.log(overallBalanceChained);

// // flatMap - Combines map and flat (only goes one level deep)
// const overallBalanceFlatMap = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((accum, mov) => accum + mov, 0);
// console.log(overallBalanceFlatMap);

///////////////////////////////////////////////////////////////////////////
// Sorting Arrays
console.log('---------- Sorting Arrays ----------');
///////////////////////////////////////////////////////////////////////////

// // STRINGS
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners); // Original array has been mutated

// // NUMBERS
// console.log(movements);
// // console.log(movements.sort()); // Doesn't work the same. Sort converts to strings before sorting

// // if return < 0 then A will be before B (keep order)
// // if return > 0 then B will be before A (switch order)

// // Sorts in ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// // Better way to write
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Sorts in descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
// // Better way to write
// movements.sort((a, b) => b - a);
// console.log(movements);

///////////////////////////////////////////////////////////////////////////
// More Ways of Creating and Filling Arrays
console.log('---------- More Ways of Creating and Filling Arrays ----------');
///////////////////////////////////////////////////////////////////////////

const arr = [1, 2, 3, 4, 5, 6, 7]; // Old way
console.log(new Array(1, 2, 3, 4, 5, 6, 7)); // With Array constructor

// Empty arrays + fill method
const x = new Array(7);
console.log(x); // [empty * 7]

// x.fill(1); // Fills with 1's
// x.fill(1, 3); // Fills with 1's starting at index 3
x.fill(1, 3, 5); // Fills with 1's from index 3 to index 5
console.log(x);

arr.fill(23, 4, 6); // Mutates original array
console.log(arr);

// Array.from (Method on constructor, not array)
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

// Challenge: Generate array with 100 random dice rolls

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
console.log(movementsUI);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  ); // Like writing movementsUI.map(el => Number(el.textContent.replace('€', '')))
  console.log(movementsUI);
});

///////////////////////////////////////////////////////////////////////////
// Array Methods Practice
console.log('---------- Array Methods Practice ----------');
///////////////////////////////////////////////////////////////////////////

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0); // See note below about 'count + 1' vs 'count++'

console.log(numDeposits1000);

// A note about the ++ operator
let a = 10;
console.log(a++); // Adds 1 but returns the previous value 10
console.log(a);

// 3. Get sum of deposits and withdrawals
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);

// Another way...
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4. Covert any string to a title case
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return titleCase;
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////////////////////////////////////////

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

///////////////////////////////////////////////////////////////////////////
// CHALLENGE EXERCISES
console.log('---------- CHALLENGE EXERCISES ----------');
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// CHALLENGE #1
console.log('---------- CHALLENGE #1 ----------');
///////////////////////////////////////////////////////////////////////////

// // Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// // Test 1 Data
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// // Test 2 Data
// // const dogsJulia = [9, 16, 6, 8, 3];
// // const dogsKate = [10, 5, 6, 1, 4];

// // 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)

// // 2. Create an array with both Julia's (corrected) and Kate's data
// // 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy �")

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCopy = dogsJulia.slice();
//   dogsJuliaCopy.splice(0, 1);
//   dogsJuliaCopy.splice(-2);
//   // or juliaDogs.slice(1, 3);

//   const dogsArr = dogsJulia.concat(dogsKate);

//   dogsArr.forEach(function (age, index) {
//     const adult = age >= 3 ? 'an adult' : 'a puppy';
//     console.log(
//       `Dog number ${index + 1} is an ${adult}, and is ${age} years old`
//     );
//   });
// };

// // 4. Run the function for both test datasets  */

// checkDogs(dogsJulia, dogsKate);

///////////////////////////////////////////////////////////////////////////
// CHALLENGE #2
console.log('---------- CHALLENGE #2 ----------');
///////////////////////////////////////////////////////////////////////////

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4

// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)

// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages �)

// 4. Run the function for both test datasets
// Test data:
// Data 1: [5, 2, 4, 1, 15, 8, 3]
// Data 2: [16, 6, 10, 5, 6, 1, 4]

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
//   console.log(humanAges);
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(adults);
//   const avgAge = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   // Another way to calculate averages
//   // const avgAge = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   console.log(avgAge);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

///////////////////////////////////////////////////////////////////////////
// CHALLENGE #3
console.log('---------- CHALLENGE #3 ----------');
///////////////////////////////////////////////////////////////////////////

// const calcAverageHumanAgeChained = ages =>
//   ages
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAgeChained([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAgeChained([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

///////////////////////////////////////////////////////////////////////////
// CHALLENGE #4
console.log('---------- CHALLENGE #4 ----------');
///////////////////////////////////////////////////////////////////////////

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg

dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) �

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eatong too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  }`
);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners)
  .join(' and ');
// console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners)
  .join(' and ');
// console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!

console.log(`${ownersEatTooMuch}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle}'s dogs eat too little!`);

// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)

const eatingTheRightAmount = dogs.find(
  dog => dog.curFood === dog.recommendedFood
);
console.log(eatingTheRightAmount);

// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)

const eatingOkayAmount = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(eatingOkayAmount));

// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)

console.log(dogs.filter(eatingOkayAmount));

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects �)

const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsSorted);

// // Sorts in ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
// // Better way to write
// movements.sort((a, b) => a - b);
// console.log(movements);
