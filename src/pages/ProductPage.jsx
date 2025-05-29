import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductPage.css';

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the API
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-page">
      <h1 className="blue-header">All Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`} className="product-link">
              <img src={product.image} alt={product.title} className="product-image" />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Cart Button at the bottom */}
      <div className="cart-button-container">
        <Link to="/cart" className="cart-button">
          Go to Cart
        </Link>
      </div>
    </div>
  );
}

export default ProductPage;
