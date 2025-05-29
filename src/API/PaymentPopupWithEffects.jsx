import React, { useState } from "react";
import axios from "axios";
import "./PaymentPopup.css";

const PaymentPopupWithEffects = ({ setShowPopup }) => {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/store/checkout", formData);
      setShowSuccess(true);
      setErrorMessage("");
      setTimeout(() => {
        setShowPopup(false);
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      setErrorMessage("There was an issue processing your payment. Please try again.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {showSuccess ? (
          <div className="success-message">
            <h2>🎉 Payment Successful!</h2>
            <p>Thank you, <strong>{formData.username}</strong>! Your order has been processed.</p>
            <button className="btn-close" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        ) : (
          <form className="payment-form" onSubmit={handleSubmit}>
            <h2>Enter Payment Details</h2>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="btn-submit">Proceed</button>
            <button type="button" className="btn-cancel" onClick={() => setShowPopup(false)}>Cancel</button>
          </form>
        )}
        <div class="balloon-container">
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
  <div class="balloon"></div>
</div>

      </div>
    </div>
  );
};

export default PaymentPopupWithEffects;
