export function calculateSubtotal(cart, products) {
  let total = 0;
  for (const item of cart) {
    const product = products.find(p => p.id === item.productId);
    if (!product) continue;
    total += product.price * item.quantity;
  }
  return Math.max(0, total);
}

export function applyCoupon(subtotal, coupon) {
  if (!coupon || !coupon.discountPercent) return Math.max(0, subtotal);
  const percent = Math.min(Math.max(coupon.discountPercent, 0), 100);
  return Math.max(0, Math.round(subtotal * (1 - percent / 100)));
}

export function calculateTotal(subtotal, coupon) {
  return applyCoupon(subtotal, coupon);
}
