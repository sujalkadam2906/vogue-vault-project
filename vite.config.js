import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: { port: 3000 },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        product: resolve(__dirname, 'product.html'),
        bag: resolve(__dirname, 'bag.html'),
        wishlist: resolve(__dirname, 'wishlist.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        orderSuccess: resolve(__dirname, 'order-success.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        credits: resolve(__dirname, 'credits.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        shipping: resolve(__dirname, 'shipping.html'),
        notFound: resolve(__dirname, '404.html'),
      }
    }
  }
});
