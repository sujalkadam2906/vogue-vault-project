import { getCart, saveCart } from '../utils/storage.js';
import { validateCartItem } from '../utils/validators.js';
import { getProductById } from './product-service.js';

export { getCart, saveCart };

export function addToCart(productId, size, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return false;
  if (product.availableSizes && product.availableSizes.length > 0 && !size) return false;
  if (!validateCartItem(productId, size, quantity, product)) return false;
  const cart = getCart();
  const existing = cart.find(c => c.productId === productId && c.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, size, quantity });
  }
  saveCart(cart);
  return true;
}

export function removeFromCart(productId, size) {
  const cart = getCart();
  const updated = cart.filter(c => !(c.productId === productId && c.size === size));
  saveCart(updated);
  return updated;
}

export function updateQuantity(productId, size, quantity) {
  const cart = getCart();
  const item = cart.find(c => c.productId === productId && c.size === size);
  if (!item) return false;
  if (quantity <= 0) {
    return removeFromCart(productId, size);
  }
  item.quantity = quantity;
  saveCart(cart);
  return true;
}

export function getCartItemCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
