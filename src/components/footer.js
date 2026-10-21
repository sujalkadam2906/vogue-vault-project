export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="site-footer">
      <div class="page-container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>VOGUE VAULT</h4>
            <p>Curated apparel and footwear focusing on durable materials, considered tailoring, and everyday utility.</p>
          </div>

          <div class="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><a href="products.html">All Products</a></li>
              <li><a href="products.html?gender=Men">Men's Collection</a></li>
              <li><a href="products.html?gender=Women">Women's Collection</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Customer Care</h4>
            <ul>
              <li><a href="shipping.html">Shipping and Returns</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms and Conditions</a></li>
              <li><a href="credits.html">Image Credits</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© ${currentYear} VOGUE VAULT. All rights reserved.</p>
          <p>Frontend demonstration store. Orders and preferences are stored in local storage.</p>
        </div>
      </div>
    </footer>
  `;
}
