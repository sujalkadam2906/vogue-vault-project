import { renderProductCard } from './product-card.js';

export function renderProductGrid(products) {
  return `<div class="grid-4 product-grid">${products.map(p => renderProductCard(p)).join('')}</div>`;
}
