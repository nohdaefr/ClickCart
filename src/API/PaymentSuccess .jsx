import React from "react";
import "./PaymentSuccess.css"; // Ensure styles are added

const PaymentSuccess = ({ username, onClose }) => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="checkmark-container">
          <div className="checkmark">✔</div>
        </div>
        <h2>Payment Successful!</h2>
        <p className="username">
          🎉 Congratulations, <strong>{username}</strong>! 🎉
        </p>
        <p>Your payment was successfully processed.</p>
        <button onClick={onClose} className="continue-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
