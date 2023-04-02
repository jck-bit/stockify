import React,{useState, useEffect} from 'react';
import {Product} from '../types'
import { useSnackbar } from 'notistack';
import {IoMdTrash} from "react-icons/io";
import {Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Rootstate, CartItem, deleteCart,deleteOneProduct } from '../state';

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
        <div>
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
          
          <p className="cart__total">Total:Ksh {totalAmount}</p>
          <button className="cart__checkout-button">Checkout</button>
          <button onClick={() =>{handleDelete()}}>DeleteCart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
