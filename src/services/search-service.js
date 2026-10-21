import { getAllProducts } from './product-service.js';

export function searchProducts(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return getAllProducts();
  return getAllProducts().filter(p => {
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });
}
