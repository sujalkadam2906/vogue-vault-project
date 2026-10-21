const STORAGE_KEYS = {
  CART: 'fashion_clone_cart',
  WISHLIST: 'fashion_clone_wishlist',
  RECENT_SEARCHES: 'fashion_clone_recent_searches',
  RECENTLY_VIEWED: 'fashion_clone_recently_viewed',
  ORDERS: 'fashion_clone_orders'
};

export function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (e) {
    console.error('Storage read error for', key, e);
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error for', key, e);
  }
}

export function getCart() {
  const data = readStorage(STORAGE_KEYS.CART);
  if (!Array.isArray(data)) return [];
  return data;
}

export function saveCart(cart) {
  if (!Array.isArray(cart)) return;
  writeStorage(STORAGE_KEYS.CART, cart);
}

export function getWishlist() {
  const data = readStorage(STORAGE_KEYS.WISHLIST);
  if (!Array.isArray(data)) return [];
  return data;
}

export function saveWishlist(wishlist) {
  if (!Array.isArray(wishlist)) return;
  writeStorage(STORAGE_KEYS.WISHLIST, wishlist);
}

export { STORAGE_KEYS };
