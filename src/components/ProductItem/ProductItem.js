import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function ProductItem({ product }) {
  const productName = product?.name || 'Название товара не указано';
  const productPrice = product?.colors?.[0]?.price || 0;

  return (
    <Link to={`/product/${product.id}`} className="product-item">
      {' '}
      <div>
        <h3>{productName}</h3>
        <p>Цена: {productPrice} руб.</p>
      </div>
    </Link>
  );
}

export default ProductItem;
