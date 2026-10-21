import { formatCurrency } from '../src/utils/formatters.js';

console.assert(formatCurrency(599) === '\u20B9599', 'Currency format failed');
console.log('formatters test passed');
