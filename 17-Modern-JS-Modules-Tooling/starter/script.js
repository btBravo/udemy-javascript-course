// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, totalQuantity);

console.log('Importing module');
// console.log(shippingCost);

// ------------------------------------------------------

// Can import everything using *
// import * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// ------------------------------------------------------

// Create name for default export when imported
// import add from './shoppingCart.js';
// add('pizza', 2);

// // Can import default and named exports (but should avoid)
// import add, {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from './shoppingCart.js'; // default export outside of {}. Named exports inside {}.

// add('pizza', 2);
// console.log(price);

// There is a live connection between exports and imports, not just a copy
import add, { cart } from './shoppingCart.js';

add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart); // Cart is not logged as an empty array but shows added products

// // Top-Level await (ES2022)
// // Can be used outside of an async function in modules only)
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json(); // This blokcks the rest of the code however
// console.log(data);
// console.log('Something'); // Logs after the await is finished (unlike in an async)

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   // console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost();
// console.log(lastPost); // Returns promise. When getLastPost() is called the data isn't available yet

// Could do this, but not very clean
// lastPost.then(last => console.log(last));

// Use top-level await instead
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

/////////////////////////////////////////////////////////////////////////
// The Module Pattern

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart. Shipping cost is ${shippingCost}`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2); // Works becasue of 'closure'
console.log(ShoppingCart2.shippingCost); // undefined

//////////////////////////////////////////////////////////////////////////
// // CommonJS Modules (Module system for Node.js)

// // Export
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to cart. Shipping cost is ${shippingCost}`
//   );
// }; // This works in Node.js not in the browser

// // Import
// const  { addToCart } = require('./shoppingCart.js'); // require is not defined in browser but in the CommonJS module system

//////////////////////////////////////////////////////////////////////////////
// Introduction to NPM

// import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; // with Parcel only need this

const state = {
  cart: [
    { product: 'bread', qunatity: 5 },
    { produtc: 'pizza', qunatity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone); // loggedIn: false
console.log(stateDeepClone); // loggedIn: true

// Hot module reloading will inject changes into browser wihtout triggering a whole page reload. Helps maintain state during development
if (module.hot) {
  module.hot.accept();
}

// New ES6 features cannot be transpiled with Parcel
// find() and Promise do not have ES5 equivalents and cannot be converted. Must be Polyfilled instead
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// To polyfill everything
import 'core-js/stable';
// To polyfill specific features, if neccessary
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// For polyfilling async functions
import 'regenerator-runtime/runtime';
