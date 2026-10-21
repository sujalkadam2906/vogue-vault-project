const coupons = [
  { code: 'WELCOME10', discountPercent: 10, minSubtotal: 500 },
  { code: 'FASHION20', discountPercent: 20, minSubtotal: 1000 },
];

export function validateCoupon(code, subtotal) {
  const coupon = coupons.find(c => c.code === (code || '').toUpperCase());
  if (!coupon) return null;
  if (subtotal < coupon.minSubtotal) return null;
  return coupon;
}
