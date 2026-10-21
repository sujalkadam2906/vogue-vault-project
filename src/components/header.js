// Header component with wordmark, working navigation links, search, wishlist, live bag count, and responsive mobile drawer.

let isDelegationBound = false;

function ensureDelegation() {
  if (isDelegationBound || typeof document === 'undefined') return;
  isDelegationBound = true;
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('#mobile-menu-toggle');
    if (toggleBtn) {
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer) {
        const isOpen = drawer.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      return;
    }

    // Close drawer when clicking outside or on a link inside drawer
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer && drawer.classList.contains('is-open')) {
      if (!e.target.closest('#mobile-nav-drawer') || e.target.closest('.mobile-nav-links a')) {
        drawer.classList.remove('is-open');
        const btn = document.getElementById('mobile-menu-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

export function renderHeader(cartCount = 0) {
  ensureDelegation();

  return `
    <header class="sticky-header">
      <div class="page-container header-inner">
        <div class="header-brand-wrap">
          <button id="mobile-menu-toggle" class="mobile-menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav-drawer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <a href="index.html" class="brand-wordmark" aria-label="VOGUE VAULT Home">VOGUE VAULT</a>
        </div>

        <nav class="header-nav" aria-label="Primary navigation">
          <ul class="nav-links">
            <li><a href="products.html" class="nav-link">Shop</a></li>
            <li><a href="products.html?gender=Men" class="nav-link">Men</a></li>
            <li><a href="products.html?gender=Women" class="nav-link">Women</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <form class="header-search-form" role="search" action="products.html" method="GET">
            <label for="site-search-input" class="visually-hidden">Search products</label>
            <svg class="header-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input id="site-search-input" class="header-search-input" name="q" type="search" placeholder="Search..." autocomplete="off" />
          </form>

          <a href="wishlist.html" class="header-action-link" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Wishlist</span>
          </a>

          <a href="bag.html" class="header-action-link" aria-label="Shopping Bag, ${cartCount} items">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Bag</span>
            <span class="cart-badge" id="header-cart-badge">${cartCount}</span>
          </a>
        </div>
      </div>

      <div id="mobile-nav-drawer" class="mobile-nav-drawer" role="dialog" aria-label="Mobile Navigation">
        <div class="mobile-nav-links">
          <a href="products.html">Shop All</a>
          <a href="products.html?gender=Men">Men's Collection</a>
          <a href="products.html?gender=Women">Women's Collection</a>
          <a href="wishlist.html">Wishlist</a>
          <a href="bag.html">Shopping Bag (${cartCount})</a>
        </div>
      </div>
    </header>
  `;
}
