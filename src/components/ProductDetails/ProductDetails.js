import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, getSizes } from '../../services/api';
import { addItem } from '../../store/cartSlice';
import toast from 'react-hot-toast';
import './styles.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const cartItemsCount = useSelector((state) => state.cart.length);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
        const sizesData = await getSizes();
        setSizes(sizesData);
      } catch (error) {
        console.error('Ошибка загрузки товара:', error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && selectedColor) {
      const availableSizesIds = product.colors.find((c) => c.id === selectedColor)?.sizes || [];
      setAvailableSizes(availableSizesIds.map((sizeId) => sizes.find((s) => s.id === sizeId)));
    }
  }, [product, selectedColor, sizes]);

  const addToCart = () => {
    if (selectedColor && selectedSize && product) {
      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.colors.find((c) => c.id === selectedColor).price,
          image: product.colors.find((c) => c.id === selectedColor).images[0],
          colorId: selectedColor,
          sizeId: selectedSize.id,
        })
      );

      toast.success('Добавлено в корзину');
    } else {
      toast.error('Выберите цвет и размер');
    }
  };

  if (!product) return <p>Загрузка...</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.colors[0].images[0]} alt={product.name} />
      <p>Цена: {product.colors[0].price} руб.</p>
      <div>
        <label className="param-select" htmlFor="colorSelect">
          Выберите цвет:
        </label>
        <select
          id="colorSelect"
          value={selectedColor}
          onChange={(e) => setSelectedColor(parseInt(e.target.value, 10))}
        >
          <option value={null}>Выберите цвет</option>
          {product.colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="param-select" htmlFor="sizeSelect">
          Выберите размер:
        </label>
        <select
          id="sizeSelect"
          value={selectedSize?.id || null}
          onChange={(e) =>
            setSelectedSize(sizes.find((s) => s.id === parseInt(e.target.value, 10)))
          }
        >
          <option value={null}>Выберите размер</option>
          {availableSizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={addToCart}>Добавить в корзину</button>
        <Link to="/cart">
          <button className="cart-button">Корзина ({cartItemsCount})</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
