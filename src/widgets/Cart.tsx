import React,{useState, useEffect} from 'react';
import {Product, CartItem} from '../types'
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {IoMdTrash} from "react-icons/io";
import {Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Rootstate, deleteCart,deleteOneProduct } from '../state';

const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);

  useEffect(() =>{
    setTotalAmount(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
  },[cartItems])

  const handleDelete =() =>{
    dispatch(deleteCart())
  }

  const handleRemoveFromCart = (product: Product) => {
    dispatch(deleteOneProduct(product.id))
    enqueueSnackbar(`Item removed from your Cart`, {
      variant: "warning",
      autoHideDuration: 1500
    })
  }

  const handleCheckout = async () => {
    try {
      const saleItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      await axios.post('http://localhost:5000/sales', { saleItems });
      dispatch(deleteCart());
      enqueueSnackbar(`Your order has been placed!`, {
        variant: 'success',
        autoHideDuration: 1500,
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Failed to place order. Please try again later.`, {
        variant: 'error',
        autoHideDuration: 1500,
      });
    }
  };

  return (
    <div className="cart">
      <h2 className="cart__title">Cart Items</h2>
      {cartItems.length === 0 ? (
       <div className="empty_cart_navigate">
        <h1>Your Cart is empty</h1>
        <Link to={"/products"}>
          <button>Shop now</button>
        </Link>
       </div>        
      ) : (
        <div className='whole_cart'>
            {cartItems.map(item => (
          <ul className="cart__list" key={item.id}>
              <li className="cart__item">
                <h1 className="cart__item__name">{item.name}</h1>
                <span className="cart__item__price">$ {item.price}</span>

                <div onClick={() => handleRemoveFromCart(item)}>
                  <span className='remove_one_cart'><IoMdTrash/></span>
                </div>
              </li>
          </ul>
            ))}
          <div className="cart_summary">
            <p className="cart__total">Total:Ksh {totalAmount}</p>
            <button className="cart__checkout-button" onClick={handleCheckout}>Checkout</button>
            <button onClick={() =>{handleDelete()}}>DeleteCart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
