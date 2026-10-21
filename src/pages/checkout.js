import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { getCart, getCartItemCount, saveCart } from '../services/cart-service.js';
import { getAllProducts } from '../services/product-service.js';
import { calculateSubtotal } from '../utils/pricing.js';
import { formatCurrency } from '../utils/formatters.js';
import { createMockOrder } from '../services/order-service.js';
import { showToast } from '../components/toast.js';

function updateHeader() {
  const headerMount = document.getElementById('header');
  if (headerMount) {
    headerMount.innerHTML = renderHeader(getCartItemCount());
  }
}

updateHeader();
document.getElementById('footer').innerHTML = renderFooter();

const cart = getCart();
const products = getAllProducts();
const summaryMount = document.getElementById('checkout-summary');

if (cart.length === 0) {
  const layout = document.querySelector('.checkout-layout');
  if (layout) {
    layout.innerHTML = `
      <div class="empty-state">
        <h2>Your Bag Is Empty</h2>
        <p>Add pieces to your bag before proceeding to checkout.</p>
        <a href="products.html" class="btn-primary">Browse Catalogue</a>
      </div>
    `;
  }
} else {
  const subtotal = calculateSubtotal(cart, products);

  if (summaryMount) {
    let itemsReviewHtml = '';
    for (const item of cart) {
      const product = products.find(p => p.id === item.productId);
      if (!product) continue;
      itemsReviewHtml += `
        <div class="summary-row">
          <span>${product.name} × ${item.quantity}${item.size ? ' (' + item.size + ')' : ''}</span>
          <span>${formatCurrency(product.price * item.quantity)}</span>
        </div>
      `;
    }

    summaryMount.innerHTML = `
      <h3>Order Summary</h3>
      ${itemsReviewHtml}
      <div class="summary-row">
        <span>Delivery</span>
        <span>Complimentary</span>
      </div>
      <div class="summary-row total-row">
        <span>Total Payable</span>
        <span>${formatCurrency(subtotal)}</span>
      </div>
    `;
  }

  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name') || '').toString().trim();
      const address = (fd.get('address') || '').toString().trim();
      const pin = (fd.get('pin') || '').toString().trim();
      const payment = fd.get('payment');
      const agree = fd.get('agree');

      if (!name || !address || !pin) {
        showToast('Please fill in all required shipping fields.', 'error');
        return;
      }

      if (!/^\d{6}$/.test(pin)) {
        showToast('Please enter a valid 6-digit PIN code.', 'error');
        return;
      }

      if (!agree) {
        showToast('Please agree to the Terms and Conditions and Privacy Policy.', 'error');
        return;
      }

      const orderData = {
        name,
        address,
        pin
      };

      const order = createMockOrder(cart, orderData, payment);
      order.totalAmount = subtotal;

      // Clear cart
      saveCart([]);

      // Redirect to order-success with order reference
      window.location.href = `order-success.html?orderId=${encodeURIComponent(order.id)}`;
    });
  }
}
