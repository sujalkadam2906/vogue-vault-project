import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { getWishlist } from '../utils/storage.js';
import { getAllProducts } from '../services/product-service.js';
import { addToCart, getCartItemCount } from '../services/cart-service.js';
import { removeFromWishlist } from '../services/wishlist-service.js';
import { showToast } from '../components/toast.js';

function updateHeader() {
  const headerMount = document.getElementById('header');
  if (headerMount) {
    headerMount.innerHTML = renderHeader(getCartItemCount());
  }
}

updateHeader();
document.getElementById('footer').innerHTML = renderFooter();

export function renderWishlist() {
  const wishlist = getWishlist();
  const products = getAllProducts();
  const container = document.getElementById('wishlist-content');

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Your Wishlist Is Empty</h2>
        <p>Save items you like while browsing to keep track of them here.</p>
        <a href="products.html" class="btn-primary">Browse Catalogue</a>
      </div>
    `;
    return;
  }

  let html = '<div class="grid-4">';
  for (const item of wishlist) {
    const product = products.find(p => p.id === item.productId);
    if (!product) continue;
    const imgSrc = (product.images && product.images[0]) || 'assets/images/placeholders/product-placeholder.svg';

    html += `
      <article class="product-card" data-id="${product.id}">
        <a href="product.html?id=${product.id}" class="product-card-image-wrap" aria-label="${product.name}">
          <img src="${imgSrc}" alt="${product.name}" width="400" height="500" loading="lazy" onerror="this.onerror=null;this.src='assets/images/placeholders/product-placeholder.svg';" />
        </a>
        <div class="card-body">
          <p class="brand">${product.brand}</p>
          <h3 class="name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <div class="price-row">
            <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
          </div>
          <div class="product-card-actions">
            <button type="button" class="btn-primary btn-sm btn-move-to-bag" data-id="${product.id}">Move to Bag</button>
            <button type="button" class="btn-secondary btn-sm btn-remove-wishlist" data-id="${product.id}">Remove</button>
          </div>
        </div>
      </article>
    `;
  }
  html += '</div>';
  container.innerHTML = html;

  container.querySelectorAll('.btn-remove-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      removeFromWishlist(id);
      showToast('Item removed from wishlist.');
      renderWishlist();
    });
  });

  container.querySelectorAll('.btn-move-to-bag').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const product = products.find(p => p.id === id);
      const defaultSize = (product && product.availableSizes && product.availableSizes[0]) || null;
      addToCart(id, defaultSize, 1);
      removeFromWishlist(id);
      showToast('Moved to bag.');
      updateHeader();
      renderWishlist();
    });
  });
}

renderWishlist();
