import products from '../data/products.js';

export function getProductById(id) {
  return products.find(p => p.id === id) || null;
}

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter(p => p.isFeatured);
}
