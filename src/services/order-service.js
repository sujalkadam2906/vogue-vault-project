import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage.js';

export function createMockOrder(cart, address, paymentMethod) {
  const orders = readStorage(STORAGE_KEYS.ORDERS) || [];
  const order = {
    id: 'ORD-' + Date.now(),
    items: cart,
    address: address || {},
    paymentMethod: paymentMethod || 'Simulated',
    totalAmount: 0,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  writeStorage(STORAGE_KEYS.ORDERS, orders);
  return order;
}
