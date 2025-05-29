import { useState } from "react";

function PaymentPage() {
  const colors = ["red", "pink", "yellow", "green"];
  let index = 0;

  const startPaymentEffect = () => {
    const interval = setInterval(() => {
      document.body.style.backgroundColor = colors[index];
      index = (index + 1) % colors.length;
    }, 500);

    setTimeout(() => clearInterval(interval), 5000);
  };

  return (
    <div>
      <button onClick={startPaymentEffect}>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
