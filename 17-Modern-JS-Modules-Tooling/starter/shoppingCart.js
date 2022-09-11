// Exporting module
console.log('Exporting a module');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
// Remember export needs to be in top-level code

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };

// Usually use deafult exports when we want to export only one thing per module
// To export same function above only export the value, not the name
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
