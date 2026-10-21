import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { getAllProducts, getFeaturedProducts } from '../services/product-service.js';
import { renderProductGrid } from '../components/product-grid.js';
import { getCartItemCount } from '../services/cart-service.js';

document.getElementById('header').innerHTML = renderHeader(getCartItemCount());
document.getElementById('footer').innerHTML = renderFooter();

const allProducts = getAllProducts();
// New arrivals (first 4 items in collection)
const newArrivals = allProducts.slice(0, 4);
// Featured pieces (filtered by isFeatured)
const featured = getFeaturedProducts().slice(0, 4);

const trendingGrid = document.getElementById('trending-grid');
if (trendingGrid) {
  trendingGrid.innerHTML = renderProductGrid(newArrivals);
}

const featuredGrid = document.getElementById('featured-grid');
if (featuredGrid) {
  featuredGrid.innerHTML = renderProductGrid(featured);
}
