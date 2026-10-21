export function renderProductCard(product) {
  const imgSrc = (product.images && product.images[0]) || 'assets/images/placeholders/product-placeholder.svg';
  return `<article class="product-card" data-id="${product.id}">
    <a href="product.html?id=${product.id}" class="product-card-image-wrap" aria-label="${product.name}">
      <img src="${imgSrc}" alt="${product.name}" width="400" height="500" loading="lazy" onerror="this.onerror=null;this.src='assets/images/placeholders/product-placeholder.svg';" />
    </a>
    <div class="card-body">
      <p class="brand">${product.brand}</p>
      <h3 class="name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
      <div class="price-row">
        <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
      </div>
    </div>
  </article>`;
}
