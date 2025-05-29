import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { loadFull } from 'tsparticles';

import Auth from './pages/Auth';
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import { CartProvider } from './pages/CartContext';
import PaymentPopupWithEffects from './API/PaymentPopupWithEffects';

import './styles.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  // Optional: If you plan to use tsparticles somewhere, you can init it like this:
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <CartProvider>
      <Router basename="/clickcart">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout setShowPopup={setShowPopup} />} />
        </Routes>
      </Router>

      {/* Conditionally render the payment popup */}
      {showPopup && <PaymentPopupWithEffects setShowPopup={setShowPopup} />}
    </CartProvider>
  );
}

export default App;
