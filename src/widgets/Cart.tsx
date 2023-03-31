import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rootstate, CartItem, deleteCart } from '../state';


const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDelete =() =>{
    dispatch(deleteCart())
  }

  return (
    <div className="cart">
      <h2 className="cart__title">Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
            {cartItems.map(item => (
          <ul className="cart__list" key={item.id}>
              <li className="cart__item">
                <span className="cart__item__name">{item.name}</span>
                <span className="cart__item__quantity">{item.quantity} x</span>
                <span className="cart__item__price">{item.price} USD</span>
              </li>
            </ul>
            ))}
          
          <p className="cart__total">Total: {total} USD</p>
          <button className="cart__checkout-button">Checkout</button>
          <button onClick={() =>{handleDelete()}}>DeleteCart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
