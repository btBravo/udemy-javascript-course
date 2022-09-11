// Challenge #1
// ----------------------------------------------

// let massMark = 78;
// let heightMark = 1.69;
// let massJohn = 92;
// let heightJohn = 1.95;

// let massMark = 95;
// let heightMark = 1.88;
// let massJohn = 95;
// let heightJohn = 1.76;

// let BMIMark = massMark / heightMark ** 2;
// let BMIJohn = massJohn / heightJohn;

// let markHigherBMI = BMIMark > BMIJohn;

// console.log(BMIMark, BMIJohn, markHigherBMI);


// Challenge #2
// ----------------------------------------------

// if (markHigherBMI) {
//   console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`)
// } else {
//   console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`)
// }

// Challenge #3
// ---------------------------------------------

// const scoreDolphins = (96 + 108 + 89) / 3;
// const scoreKoalas = (88 + 91 + 110) / 3;
// console.log(`Dolphins score: ${scoreDolphins} | Koalas score: ${scoreKoalas}`);

// if (scoreDolphins > scoreKoalas) {
//   console.log('Dolphins Win!')
// } else if (scoreDolphins < scoreKoalas) {
//   console.log('Koalas Win!')
// } else {
//   console.log('Match is a draw.')
// }


// Bonus 1
// const scoreDolphins = (97 + 112 + 101) / 3;
// const scoreKoalas = (109 + 95 + 123) / 3;
// console.log(`Dolphins score: ${scoreDolphins} | Koalas score: ${scoreKoalas}`);

// if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
//   console.log('Dolphins win the trophy!') 
// } else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
//   console.log('Koalas win the trophy!')
// } else (scoreDolphins === scoreKoalas) {
//   console.log('Both win the trophy!')
// }



// Bonus 2
// const scoreDolphins = (97 + 112 + 101) / 3;
// const scoreKoalas = (109 + 95 + 106) / 3;
// const minScoreDolphins = scoreDolphins > 100;
// const minScoreKoalas = scoreKoalas > 100;

// console.log(`Dolphins score: ${scoreDolphins} | Koalas score: ${scoreKoalas}`);

// if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
//   console.log('Dolphins win the trophy!') 
// } else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
//   console.log('Koalas win the trophy!')
// } else if (scoreDolphins === scoreKoalas && scoreDolphins >=100 && scoreKoalas >= 100) {
//   console.log('Both win the trophy!')
// } else {
//   console.log('No one wins the trophy =(')
// }


// Challenge #4
// ---------------------------------------------------------

const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(`The bill was $${bill}, the tip was $${tip}, and the total value 
$${bill + tip}`)