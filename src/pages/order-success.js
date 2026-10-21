import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { getCartItemCount } from '../services/cart-service.js';
import { readStorage, STORAGE_KEYS } from '../utils/storage.js';

document.getElementById('header').innerHTML = renderHeader(getCartItemCount());
document.getElementById('footer').innerHTML = renderFooter();

const params = new URLSearchParams(window.location.search);
const requestedId = params.get('orderId');
const orders = readStorage(STORAGE_KEYS.ORDERS) || [];
const order = requestedId
  ? orders.find(o => o.id === requestedId)
  : (orders.length > 0 ? orders[orders.length - 1] : null);

const mount = document.getElementById('order-details-mount');
if (order) {
  mount.innerHTML = `
    <div class="order-reference-box">
      <p class="muted-text">Order Reference:</p>
      <div class="order-number-badge">${order.id}</div>
      <p class="muted-text">A simulation confirmation has been logged to your browser local storage.</p>
    </div>
  `;
} else {
  mount.innerHTML = `
    <div class="order-reference-box">
      <p class="muted-text">Order Reference:</p>
      <div class="order-number-badge">ORD-${Date.now().toString().slice(-6)}</div>
      <p class="muted-text">Your demo order has been logged in this session.</p>
    </div>
  `;
}
