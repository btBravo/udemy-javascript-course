// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = 23;

// const calcAge = birthYear => 2037 - birthYear;

// console.log(calcAge(1985));

// Challenge # 1

const temps1 = [17, 21, 23];
const temps2 = [12, 5, -5, 0, 4];

const printForcast = function (arr) {
  let str = '... ';
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log(str);
};

printForcast(temps1);
printForcast(temps2);
