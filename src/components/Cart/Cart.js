import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import { getSizes } from '../../services/api';
import './styles.css';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const data = await getSizes();
        setSizes(data);
      } catch (error) {
        console.error('Ошибка загрузки размеров:', error);
      }
    };
    fetchSizes();
  }, []);

  const removeFromCart = (index) => {
    const confirmDelete = window.confirm(
      'Вы действительно хотите удалить этот элемент из корзины?'
    );
    if (confirmDelete) {
      dispatch(removeItem(index));
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Корзина</h1>
      <Link to="/">
        <button className="back-button">Назад к товарам</button>
      </Link>
      {cartItems &&
        cartItems.map((item, index) => (
          <div key={index} className={`cart-item cart-item-${index}`}>
            <h3 className="item-name">{item.name}</h3>
            <p className="item-color">Цвет: {item.colorId}</p>
            <p className="item-size">Размер: {sizes.find((s) => s.id === item.sizeId)?.label}</p>
            <p className="item-price">Цена: {item.price}</p>
            <button onClick={() => removeFromCart(index)} className="remove-button">
              Удалить
            </button>
          </div>
        ))}
    </div>
  );
}

export default Cart;
