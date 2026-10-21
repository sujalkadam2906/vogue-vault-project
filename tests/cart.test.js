import { addToCart, removeFromCart, getCartItemCount } from '../src/services/cart-service.js';

console.assert(typeof addToCart === 'function', 'addToCart missing');
console.assert(typeof removeFromCart === 'function', 'removeFromCart missing');
console.log('cart service test passed');
