import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { getCart, getCartItemCount, updateQuantity, removeFromCart } from '../services/cart-service.js';
import { getAllProducts } from '../services/product-service.js';
import { calculateSubtotal, applyCoupon } from '../utils/pricing.js';
import { formatCurrency } from '../utils/formatters.js';
import { validateCoupon } from '../services/coupon-service.js';
import { showToast } from '../components/toast.js';

let appliedCoupon = null;

function updateHeader() {
  const headerMount = document.getElementById('header');
  if (headerMount) {
    headerMount.innerHTML = renderHeader(getCartItemCount());
  }
}

updateHeader();
document.getElementById('footer').innerHTML = renderFooter();

export function renderBag() {
  const cart = getCart();
  const products = getAllProducts();
  const container = document.getElementById('bag-container');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Your Bag Is Empty</h2>
        <p>You have not added any pieces to your shopping bag yet.</p>
        <a href="products.html" class="btn-primary">Browse Catalogue</a>
      </div>
    `;
    return;
  }

  // Calculate totals
  const subtotal = calculateSubtotal(cart, products);
  const total = appliedCoupon ? applyCoupon(subtotal, appliedCoupon) : subtotal;
  const discountAmount = subtotal - total;

  let itemsHtml = '<div class="bag-item-list">';
  for (const item of cart) {
    const product = products.find(p => p.id === item.productId);
    if (!product) continue;
    const itemTotal = product.price * item.quantity;
    const imgSrc = (product.images && product.images[0]) || 'assets/images/placeholders/product-placeholder.svg';

    itemsHtml += `
      <article class="bag-item" data-id="${item.productId}" data-size="${item.size || ''}">
        <div class="bag-item-image">
          <img src="${imgSrc}" alt="${product.name}" width="100" height="125" onerror="this.onerror=null;this.src='assets/images/placeholders/product-placeholder.svg';" />
        </div>
        <div class="bag-item-details">
          <h3 class="bag-item-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <p class="bag-item-meta">${product.brand}${item.size ? ' · Size ' + item.size : ''}</p>
          <div class="bag-item-price">${formatCurrency(itemTotal)}</div>
          <div class="bag-item-controls">
            <button type="button" class="qty-btn btn-qty-dec" aria-label="Decrease quantity" data-id="${item.productId}" data-size="${item.size || ''}">-</button>
            <span class="qty-display" aria-label="Current quantity">${item.quantity}</span>
            <button type="button" class="qty-btn btn-qty-inc" aria-label="Increase quantity" data-id="${item.productId}" data-size="${item.size || ''}">+</button>
          </div>
        </div>
        <button type="button" class="btn-danger btn-remove" data-id="${item.productId}" data-size="${item.size || ''}">Remove</button>
      </article>
    `;
  }
  itemsHtml += '</div>';

  const couponSummaryHtml = appliedCoupon
    ? `<div class="summary-row">
         <span>Discount (${appliedCoupon.code})</span>
         <span class="text-success">-${formatCurrency(discountAmount)}</span>
       </div>`
    : '';

  const summaryHtml = `
    <aside class="bag-summary-card">
      <h3>Order Summary</h3>
      <div class="summary-row">
        <span>Items (${getCartItemCount()})</span>
        <span>${formatCurrency(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Standard Shipping</span>
        <span>Free</span>
      </div>
      ${couponSummaryHtml}
      <div class="summary-row total-row">
        <span>Estimated Total</span>
        <span>${formatCurrency(total)}</span>
      </div>

      <div class="coupon-box">
        <label for="coupon-code-input" class="visually-hidden">Promotional coupon code</label>
        <input type="text" id="coupon-code-input" class="input-control" placeholder="Promo code (e.g. WELCOME10)" value="${appliedCoupon ? appliedCoupon.code : ''}" />
        <button type="button" id="btn-apply-coupon" class="btn-secondary">Apply</button>
      </div>

      <a href="checkout.html" class="btn-primary btn-block">Proceed to Checkout</a>
    </aside>
  `;

  container.innerHTML = `
    <div class="bag-layout">
      ${itemsHtml}
      ${summaryHtml}
    </div>
  `;

  // Attach event handlers
  container.querySelectorAll('.btn-qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.dataset.id;
      const size = btn.dataset.size || null;
      const current = cart.find(c => c.productId === pId && (c.size || null) === size);
      if (current) {
        updateQuantity(pId, size, current.quantity + 1);
        updateHeader();
        renderBag();
      }
    });
  });

  container.querySelectorAll('.btn-qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.dataset.id;
      const size = btn.dataset.size || null;
      const current = cart.find(c => c.productId === pId && (c.size || null) === size);
      if (current) {
        if (current.quantity > 1) {
          updateQuantity(pId, size, current.quantity - 1);
        } else {
          removeFromCart(pId, size);
          showToast('Item removed from bag.');
        }
        updateHeader();
        renderBag();
      }
    });
  });

  container.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.dataset.id;
      const size = btn.dataset.size || null;
      removeFromCart(pId, size);
      showToast('Item removed from bag.');
      updateHeader();
      renderBag();
    });
  });

  const applyCouponBtn = document.getElementById('btn-apply-coupon');
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
      const input = document.getElementById('coupon-code-input');
      const code = input ? input.value.trim() : '';
      if (!code) {
        showToast('Please enter a coupon code.', 'error');
        return;
      }
      const verified = validateCoupon(code, subtotal);
      if (verified) {
        appliedCoupon = verified;
        showToast(`Coupon ${verified.code} applied.`);
        renderBag();
      } else {
        showToast('Invalid or inapplicable coupon code.', 'error');
      }
    });
  }
}

renderBag();
