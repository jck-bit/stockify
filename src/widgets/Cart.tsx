import React, { useState, useEffect } from "react";
import { Product, CartItem } from "../types";
import { useSnackbar } from "notistack";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Rootstate, deleteCart,deleteOneProduct } from '../state';
import Loader from "../components/Loader";
import { myFetch } from "../../utils/Myfetch";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const user = useSelector((state: any) => state.user);
  const [quantities, setQuantity] = useState<any>()
  const [product_ids, setProduct_id] = useState<any>()
  const [user_id, setUser_id] = useState<any>()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();


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
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response:any = await myFetch("https://stockify-store-management.vercel.app/users/sales", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ quantities, user_id, product_ids }),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        if (data) {
          dispatch(deleteCart());
          enqueueSnackbar(`${data.message}`, {
            variant: "success",
            autoHideDuration: 1500,
          });
        } else {
          const error = data?.msg || "Something went wrong, please try again later";
          if(error.msg === "Token has expired"){
            enqueueSnackbar(`${error}`, {
              variant: "error",
              autoHideDuration: 1500,
            });
            localStorage.removeItem('token');
            navigate('/login');
          
          }
        }
      }
      setIsLoading(false);
    } catch (error:Error | any) {
      console.error(error);
      enqueueSnackbar(`${error?.response?.data?.error || "Failed to place order. Please try again later"}`, {
        variant: "error",
        autoHideDuration: 1500,
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  
 
  if(isloading){
    return <Loader/>
  }
  
  return (
    <div className="cart">
      <h2 className="cart__title">Cart Items</h2>
      {cartItems.length === 0 ? (
        <div className="empty_cart_navigate">
          <h1>Your Cart is empty</h1>
          <Link to={"/"}>
            <button>Shop now</button>
          </Link>

        </div>
      ) : (
        <div className="whole_cart">
          <div className="containter_cart">
          {cartItems.map((item:CartItem) => (
            <ul className="cart__list" key={item.id}>
              <li className="cart__item">
                <img src={item.product_pic} alt="" style={{width: '100px', height: '100px' ,marginRight: '10px'}}/>
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
