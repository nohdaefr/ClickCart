import React, { useState } from "react";
import "./PaymentPopup.css"; // Ensure this file contains styles for the popup and animations

const PaymentPopup = ({ setShowPopup }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission success
    setShowSuccess(true);

    // Close the popup after a delay
    setTimeout(() => {
      setShowPopup(false);
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        {showSuccess ? (
          <div className="success-message">
            <div className="fireworks">
              <div className="firework"></div>
              <div className="firework"></div>
              <div className="firework"></div>
            </div>
            <div className="balloons">
              <div className="balloon red"></div>
              <div className="balloon blue"></div>
              <div className="balloon yellow"></div>
            </div>
            <p>
              🎉 <strong>Congratulations, {formData.username}!</strong> 🎉
            </p>
            <p>Your payment was successfully processed.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Payment Details</h2>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentPopup;
