import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { getProductById, getAllProducts } from '../services/product-service.js';
import { addToCart, getCartItemCount } from '../services/cart-service.js';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../services/wishlist-service.js';
import { showToast } from '../components/toast.js';
import { renderProductCard } from '../components/product-card.js';

function updateHeader() {
  const headerMount = document.getElementById('header');
  if (headerMount) {
    headerMount.innerHTML = renderHeader(getCartItemCount());
  }
}

updateHeader();
document.getElementById('footer').innerHTML = renderFooter();

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const product = getProductById(productId);

const detailMount = document.getElementById('product-detail');
const relatedMount = document.getElementById('related-grid');

if (!product) {
  detailMount.innerHTML = `
    <div class="empty-state">
      <h2>Product Not Found</h2>
      <p>The requested item could not be located in our catalogue.</p>
      <a href="products.html" class="btn-primary">Browse Catalogue</a>
    </div>
  `;
  if (relatedMount) relatedMount.innerHTML = '';
} else {
  let selectedSize = null;
  const images = (product.images && product.images.length > 0)
    ? product.images
    : ['assets/images/placeholders/product-placeholder.svg'];
  let currentImageIndex = 0;

  const thumbnailsHtml = images.length > 1
    ? `<div class="gallery-thumbnails">
        ${images.map((img, idx) => `
          <button type="button" class="gallery-thumb-btn ${idx === 0 ? 'is-active' : ''}" data-index="${idx}" aria-label="View photo ${idx + 1}">
            <img src="${img}" alt="${product.name} view ${idx + 1}" width="72" height="90" onerror="this.onerror=null;this.src='assets/images/placeholders/product-placeholder.svg';" />
          </button>
        `).join('')}
       </div>`
    : '';

  const sizesHtml = (product.availableSizes && product.availableSizes.length > 0)
    ? `<div class="product-section-label">Select Size</div>
       <div id="size-selector" class="size-selector" role="radiogroup" aria-label="Available Sizes">
         ${product.availableSizes.map(s => `
           <button type="button" class="size-btn" data-size="${s}" role="radio" aria-checked="false">${s}</button>
         `).join('')}
       </div>`
    : '';

  const wishlistStateText = isInWishlist(product.id) ? 'Saved in Wishlist' : 'Add to Wishlist';

  detailMount.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-gallery">
        <div class="gallery-main-image">
          <img id="main-product-img" src="${images[0]}" alt="${product.name}" width="600" height="750" onerror="this.onerror=null;this.src='assets/images/placeholders/product-placeholder.svg';" />
        </div>
        ${thumbnailsHtml}
      </div>

      <div class="product-info-panel">
        <span class="product-meta-brand">${product.brand}</span>
        <h1 class="product-title">${product.name}</h1>
        
        <div class="product-price-block">
          <span class="product-detail-price">₹${product.price.toLocaleString('en-IN')}</span>
        </div>

        <p class="product-description-text">${product.description}</p>

        ${sizesHtml}

        <div class="product-action-row">
          <button type="button" id="btn-add-to-cart" class="btn-primary">Add to Bag</button>
          <button type="button" id="btn-wishlist" class="btn-secondary">${wishlistStateText}</button>
        </div>
      </div>
    </div>
  `;

  // Hook gallery thumbnails
  const thumbButtons = detailMount.querySelectorAll('.gallery-thumb-btn');
  const mainImage = document.getElementById('main-product-img');
  thumbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const idx = Number(btn.dataset.index);
      currentImageIndex = idx;
      if (mainImage && images[idx]) {
        mainImage.src = images[idx];
      }
    });
  });

  // Hook size selection
  const sizeButtons = detailMount.querySelectorAll('.size-btn');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => {
        b.classList.remove('selected');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
      selectedSize = btn.dataset.size;
    });
  });

  // Hook Add to Bag
  const addToBagBtn = document.getElementById('btn-add-to-cart');
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      if (product.availableSizes && product.availableSizes.length > 0 && !selectedSize) {
        showToast('Please select a size first.', 'error');
        return;
      }
      const success = addToCart(product.id, selectedSize || null, 1);
      if (success) {
        showToast('Item added to bag.');
        updateHeader();
      } else {
        showToast('Could not add item to bag.', 'error');
      }
    });
  }

  // Hook Wishlist
  const wishlistBtn = document.getElementById('btn-wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        wishlistBtn.textContent = 'Add to Wishlist';
        showToast('Item removed from wishlist.');
      } else {
        addToWishlist(product.id);
        wishlistBtn.textContent = 'Saved in Wishlist';
        showToast('Item saved to wishlist.');
      }
    });
  }

  // Related products
  if (relatedMount) {
    const related = getAllProducts()
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);

    if (related.length > 0) {
      relatedMount.innerHTML = related.map(p => renderProductCard(p)).join('');
    } else {
      const fallbackRelated = getAllProducts().filter(p => p.id !== product.id).slice(0, 4);
      relatedMount.innerHTML = fallbackRelated.map(p => renderProductCard(p)).join('');
    }
  }
}
