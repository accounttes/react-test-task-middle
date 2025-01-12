import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/api';
import { setProducts } from '../../store/productsSlice';
import ProductItem from '../ProductItem/ProductItem';
import './styles.css';

function ProductList() {
  const products = useSelector((state) => state.products);
  const cartItemsCount = useSelector((state) => state.cart.length);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        dispatch(setProducts(data));
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="product-list">
      {' '}
      <h1>Список товаров</h1>
      <Link to="/cart">
        <button className="cart-button"> Корзина ({cartItemsCount})</button>
      </Link>
      <div className="product-grid">
        {' '}
        {products && products.map((product) => <ProductItem key={product.id} product={product} />)}
      </div>
    </div>
  );
}

export default ProductList;
