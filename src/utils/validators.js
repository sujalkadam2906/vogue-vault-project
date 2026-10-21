export function isValidProductId(id) {
  return typeof id === 'string' && id.length > 0;
}

export function isValidSize(size, availableSizes) {
  if (!Array.isArray(availableSizes)) return false;
  return availableSizes.includes(size);
}

export function isPositiveQuantity(qty) {
  return typeof qty === 'number' && qty > 0 && Number.isInteger(qty);
}

export function validateCartItem(productId, size, quantity, product) {
  if (!isValidProductId(productId)) return false;
  if (product && product.availableSizes && product.availableSizes.length > 0) {
    if (!size || !isValidSize(size, product.availableSizes)) return false;
  }
  if (!isPositiveQuantity(quantity)) return false;
  return true;
}
