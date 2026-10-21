import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { getAllProducts } from '../services/product-service.js';
import { searchProducts } from '../services/search-service.js';
import { renderProductGrid } from '../components/product-grid.js';
import { getCartItemCount } from '../services/cart-service.js';

function updateHeader() {
  const headerMount = document.getElementById('header');
  if (headerMount) {
    headerMount.innerHTML = renderHeader(getCartItemCount());
  }
}

updateHeader();
document.getElementById('footer').innerHTML = renderFooter();

const params = new URLSearchParams(window.location.search);
const initialQuery = params.get('q') || '';
const initialGender = params.get('gender') || '';
const initialCategory = params.get('category') || '';

const searchInput = document.getElementById('filter-search');
const genderSelect = document.getElementById('filter-gender');
const categorySelect = document.getElementById('filter-category');
const sortSelect = document.getElementById('filter-sort');
const headingEl = document.getElementById('catalogue-heading');
const countEl = document.getElementById('results-count');
const listDiv = document.getElementById('product-list');

const allProducts = getAllProducts();
const categories = [...new Set(allProducts.map(p => p.category))].sort();

// Populate categories
categories.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c;
  opt.textContent = c;
  categorySelect.appendChild(opt);
});

// Set initial filter values from URL
if (initialQuery && searchInput) {
  searchInput.value = initialQuery;
}
if (initialGender && genderSelect) {
  genderSelect.value = initialGender;
}
if (initialCategory && categorySelect) {
  categorySelect.value = initialCategory;
}

function updatePageHeading(gender, category, query) {
  if (!headingEl) return;
  if (query) {
    headingEl.textContent = `Search results for "${query}"`;
  } else if (gender && category) {
    headingEl.textContent = `${gender} · ${category}`;
  } else if (gender) {
    headingEl.textContent = `${gender}'s Collection`;
  } else if (category) {
    headingEl.textContent = category;
  } else {
    headingEl.textContent = 'All Products';
  }
}

function render() {
  const query = searchInput ? searchInput.value.trim() : '';
  const gender = genderSelect ? genderSelect.value : '';
  const category = categorySelect ? categorySelect.value : '';
  const sort = sortSelect ? sortSelect.value : 'featured';

  updatePageHeading(gender, category, query);

  let results = query ? searchProducts(query) : [...allProducts];

  if (gender) {
    results = results.filter(p => p.gender.toLowerCase() === gender.toLowerCase() || p.gender.toLowerCase() === 'unisex');
  }

  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Sorting
  if (sort === 'price-asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === 'name-asc') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'featured') {
    results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  // Update count indicator
  if (countEl) {
    countEl.textContent = `${results.length} piece${results.length === 1 ? '' : 's'}`;
  }

  if (results.length === 0) {
    listDiv.innerHTML = `
      <div class="empty-state">
        <h2>No Products Found</h2>
        <p>No items matched your current filter criteria. Try clearing search filters.</p>
        <button type="button" id="btn-reset-filters" class="btn-secondary">Reset Filters</button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (genderSelect) genderSelect.value = '';
        if (categorySelect) categorySelect.value = '';
        if (sortSelect) sortSelect.value = 'featured';
        syncUrlParams('', '', '');
        render();
      });
    }
  } else {
    listDiv.innerHTML = renderProductGrid(results);
  }
}

function syncUrlParams(query, gender, category) {
  const url = new URL(window.location);
  if (query) url.searchParams.set('q', query);
  else url.searchParams.delete('q');

  if (gender) url.searchParams.set('gender', gender);
  else url.searchParams.delete('gender');

  if (category) url.searchParams.set('category', category);
  else url.searchParams.delete('category');

  window.history.replaceState({}, '', url);
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    syncUrlParams(searchInput.value.trim(), genderSelect.value, categorySelect.value);
    render();
  });
}

[genderSelect, categorySelect, sortSelect].forEach(el => {
  if (el) {
    el.addEventListener('change', () => {
      syncUrlParams(searchInput ? searchInput.value.trim() : '', genderSelect.value, categorySelect.value);
      render();
    });
  }
});

render();
