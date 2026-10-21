import { getWishlist, saveWishlist } from '../utils/storage.js';
import { isValidProductId } from '../utils/validators.js';

export function addToWishlist(productId) {
  if (!isValidProductId(productId)) return false;
  const wishlist = getWishlist();
  if (wishlist.find(w => w.productId === productId)) return false;
  wishlist.push({ productId, addedAt: new Date().toISOString() });
  saveWishlist(wishlist);
  return true;
}

export function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const updated = wishlist.filter(w => w.productId !== productId);
  saveWishlist(updated);
  return updated;
}

export function isInWishlist(productId) {
  return getWishlist().some(w => w.productId === productId);
}
