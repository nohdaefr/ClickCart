import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import { CartContext } from './CartContext';

function ProductDetails() {
  const { id } = useParams(); // Extract the product ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to track the quantity
  const { addToCart } = useContext(CartContext); // Get addToCart from CartContext

  useEffect(() => {
    // Fetch details of the specific product
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity }; // Add quantity to the product object
    addToCart(productWithQuantity); // Add the product to the cart
    alert(`${quantity} x ${product.title} has been added to the cart!`);
  };

  // Navigate to cart page
  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="product-page">
      <img src={product.image} alt={product.title} className="product-image" />
      <h1 className="product-title">{product.title}</h1>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>
      <div className="product-actions">
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} // Ensure at least 1
            className="quantity-input"
          />
        </label>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
        {/* Go to Cart button */}
        <button onClick={handleGoToCart} className="add-to-cart-button">
          Go to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
