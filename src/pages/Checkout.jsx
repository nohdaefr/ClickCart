import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function Checkout({ setShowPopup }) {
  const { cart } = useContext(CartContext); // Access the cart from the context

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePayment = () => {
    setShowPopup(true); // This triggers the payment popup
  };

  if (cart.length === 0) {
    return <h2>Your cart is empty. Please add some items before checking out!</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Checkout</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> - {item.quantity} x ${item.price.toFixed(2)} = $
            {(item.quantity * item.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <h2>Total: ${calculateTotal()}</h2>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handlePayment} // Trigger popup when clicked
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default Checkout;
