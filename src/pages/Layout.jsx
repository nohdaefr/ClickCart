// Layout.js
import React from 'react';
import { CartProvider } from './CartContext'; // Import the CartProvider
import App from './App'; // Import the App component

const Layout = () => (
  <CartProvider> {/* Provide the Cart context to the app */}
    <App />
  </CartProvider>
);

export default Layout;
