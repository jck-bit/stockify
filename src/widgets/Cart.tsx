import React, { useState, useEffect } from "react";
import { Product, CartItem } from "../types";
import axios from "axios";
import { useSnackbar } from "notistack";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Rootstate, deleteCart,deleteOneProduct } from '../state';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const user = useSelector((state: any) => state.user);
  const [quantities, setQuantity] = useState<any>()
  const [product_ids, setProduct_id] = useState<any>()
  const [user_id, setUser_id] = useState<any>()

  useEffect(() => {
    setTotalAmount(
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  const handleDelete = () => {
    dispatch(deleteCart());
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(deleteOneProduct(product.id));
    enqueueSnackbar(`Item removed from your Cart`, {
      variant: "warning",
      
      autoHideDuration: 1500,
    });
  };
  
  useEffect(() => {
    setQuantity(
      cartItems.map(item => item.quantity)
    );
    setProduct_id(
      cartItems.map(item => item.id)
    )
    setUser_id(user.id);
  }, [cartItems, user]);               
  
  console.log(quantities)  
  
  const handleCheckout = async () => {
    try {
      
      const response = await axios.post(
        "https://stockify-store-management.vercel.app/users/sales",
        {
          quantities,
          user_id,
          product_ids
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(data)
      if (response.status == 200){
        if(data){
          dispatch(deleteCart());
          enqueueSnackbar(`${data.message}`, {
            variant: "success",
            autoHideDuration: 1500,
          });
        
        }else{
          const error = data?.error.message || "Something went wrong,please try again later";
           enqueueSnackbar(`${error || "error"}`, {
            variant: "error",
            autoHideDuration: 1500,
            });
          }
        
      }
    } catch (error:Error | any) {
      console.error(error);
      enqueueSnackbar(`${error.response.data.error}`|| "Failed to place order. Please try again later", {
        variant: "error",
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
        <div className="whole_cart">
          <div className="containter_cart">
          {cartItems.map((item) => (
            <ul className="cart__list" key={item.id}>
              <li className="cart__item">
                <h1 className="cart__item__name">{item.name}</h1>
                <span className="cart__item__price">Ksh {item.price}</span>

                <div onClick={() => handleRemoveFromCart(item)} className="remove_one_cart">
                  <span>
                    <IoMdTrash />
                  </span>
                </div>
              </li>
            </ul>
          ))}
          </div>
          <div className="cart_summary">
            <p className="cart__total">Your Total Ksh:{totalAmount}</p>
            <button className="cart__checkout-button" onClick={handleCheckout}>
              proced to checkout
            </button>
            <button onClick={() => handleDelete()} className="cart__delete-button">Delete Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
