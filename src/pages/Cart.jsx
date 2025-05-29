import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Cart.css';

function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Credit card form state
  const [creditCard, setCreditCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Change the background color when payment is successful
  useEffect(() => {
    if (showSuccessPopup) {
      document.body.style.backgroundColor = "lightgreen"; // Change to your preferred color
    } else {
      document.body.style.backgroundColor = ""; // Reset when popup disappears
    }
  }, [showSuccessPopup]);

  // Calculate total price
  const totalPrice = cart
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2);

  // Handle decrementing quantity
  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      updateCartQuantity(product.id, product.quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  // Handle credit card input changes
  const handleCardChange = (e) => {
    const value = e.target.value
      .replace(/[^\d]/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
    setCreditCard(value);
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value
      .replace(/[^\d]/g, '')
      .replace(/(\d{2})(?=\d)/g, '$1/')
      .trim();
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setCvv(value);
  };

  // Handle payment submission and clear the cart upon successful payment
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Clear all items from the cart
    [...cart].forEach(product => removeFromCart(product.id));

    setShowPaymentPopup(false); // Close payment popup
    setShowSuccessPopup(true);  // Show success popup

    setTimeout(() => {
      setShowSuccessPopup(false); // Hide success popup after 3 seconds
    }, 3000);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map((product) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{product.title}</h3>
                  <p className="cart-item-price">Price: ${product.price.toFixed(2)}</p>
                  <p className="cart-item-quantity">Quantity: {product.quantity}</p>
                  <p className="cart-item-total">Total: ${(product.price * product.quantity).toFixed(2)}</p>
                  <div className="quantity-container">
                    <button className="quantity-button" onClick={() => handleDecreaseQuantity(product)}>
                      -1
                    </button>
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2>Total: ${totalPrice}</h2>
            <button onClick={() => setShowPaymentPopup(true)} className="checkout-button">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="payment-popup">
          <h2>Enter Payment Information</h2>
          <form onSubmit={handlePaymentSubmit}>
            <div>
              <label htmlFor="credit-card-number">Credit Card Number:</label>
              <input
                type="text"
                id="credit-card-number"
                value={creditCard}
                onChange={handleCardChange}
                placeholder="#### #### #### ####"
                maxLength="19"
                required
              />
            </div>
            <div>
              <label htmlFor="expiry-date">Expiry Date:</label>
              <input
                type="text"
                id="expiry-date"
                value={expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            <div>
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={handleCvvChange}
                maxLength="3"
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit Payment</button>
          </form>
          <button onClick={() => setShowPaymentPopup(false)} className="close-popup-button">
            Close
          </button>
        </div>
      )}

      {/* Success Popup with Balloons and Fireworks */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="balloon balloon-1"></div>
          <div className="balloon balloon-2"></div>
          <div className="balloon balloon-3"></div>
          <div className="balloon balloon-4"></div>
          <div className="balloon balloon-5"></div>
          <div className="balloon balloon-6"></div>
          <div className="balloon balloon-7"></div>

          <div className="firework firework-1"></div>
          <div className="firework firework-2"></div>
          <div className="firework firework-3"></div>
          <div className="firework firework-4"></div>
          <div className="firework firework-5"></div>
          <div className="firework firework-6"></div>

          <div className="smiley smiley-1">😊</div>
          <div className="smiley smiley-2">😃</div>
          <div className="smiley smiley-3">😁</div>
          <div className="smiley smiley-4">😄</div>
          <div className="smiley smiley-5">🙂</div>
          <div className="smiley smiley-6">😍</div>

          <div style={{ marginTop: '40px' }}>
            🎉🎆 Payment Successful! Enjoy your celebration! 🎆🎉
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
