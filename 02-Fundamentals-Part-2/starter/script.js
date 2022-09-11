'use strict';

///////////////////////
// Coding Challenges //
///////////////////////

// Challenge #1

/*
const calcAverage = (score1,score2,score3) => (score1 + score2 + score3) / 3;

function checkWinner (avgDolphins,avgKoalas) {
  if (avgDolphins >= avgKoalas * 2) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`)
  } else if (avgKoalas >= avgDolphins * 2) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`)
  } else {
    console.log(`Neither team wins...`)
  }
};

// Test 1
let avgDolphins = calcAverage(44,23,71);
let avgKoalas = calcAverage(65,54,49);
console.log(avgDolphins,avgKoalas);
checkWinner(avgDolphins, avgKoalas);

// Test 2
avgDolphins = calcAverage(85,54,41);
avgKoalas = calcAverage(23,34,27);
console.log(avgDolphins,avgKoalas);
checkWinner(avgDolphins, avgKoalas);
*/



// Challenge #2

// const calcTip = function(bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// };

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// console.log(bills, tips, totals);



// Challenge #3

// const mark = {
//   fullName: 'Mark Miller',
//   mass: 78,
//   height: 1.69,
//   calcBMI: function() {
//     this.BMI = this.mass / this.height ** 2;
//     return this.BMI;
//   }
// };

// const john = {
//   fullName: 'John Smith',
//   mass: 92,
//   height: 1.95,
//   calcBMI: function() {
//     this.BMI = this.mass / this.height ** 2;
//     return this.BMI;
//   }
// };

// console.log(
//   mark.calcBMI() > john.calcBMI() ? `Mark's BMI (${mark.BMI}) is higher than Mark's (${john.BMI})` : `John's BMI (${john.BMI}) is higher than Mark's (${mark.BMI})`
// );

// or...

// mark.calcBMI();
// john.calcBMI();

// if (mark.BMI > john.BMI) {
//   console.log(`${mark.fullName}'s BMI (${mark.BMI}) is higher than ${john.fullName}'s (${john.BMI})`)
// } else if (john.BMI > mark.BMI) {
//   console.log(`${john.fullName}'s BMI (${john.BMI}) is higher than ${mark.fullName}'s (${mark.BMI})`);
// };



// Challenge #4

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(bills[i] + tip)
};
console.log(bills, tips, totals);

//Bonus:

function calcAverage(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

console.log(calcAverage(totals));