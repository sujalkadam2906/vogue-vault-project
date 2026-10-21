if (typeof localStorage === 'undefined') {
  const store = {};
  globalThis.localStorage = {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { for (const k in store) delete store[k]; }
  };
}

import { readStorage, writeStorage } from '../src/utils/storage.js';

writeStorage('fashion_clone_cart', [{ productId: 'P001', size: 'M', quantity: 1 }]);
const data = readStorage('fashion_clone_cart');
console.assert(Array.isArray(data) && data.length === 1, 'Storage failed');
console.log('storage test passed');
