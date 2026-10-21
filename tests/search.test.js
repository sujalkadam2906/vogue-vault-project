import { searchProducts } from '../src/services/search-service.js';

const results = searchProducts('cotton');
console.assert(Array.isArray(results), 'Search should return array');
console.log('search test passed');
