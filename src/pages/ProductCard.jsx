import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ProductCard.css'; // Import CSS for styling

function ProductCard({ product,id }) {
  const {id, title, price, image } = product;

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-link">
      
        <img 
          src={image || 'https://via.placeholder.com/150'} 
          alt={title} 
          className="product-image" 
        />
        <h2 className="product-title">{title}</h2>
        <p className="product-price">${price.toFixed(2)}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
