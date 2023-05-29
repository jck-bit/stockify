import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Rootstate, deleteCart, deleteOneProduct } from '../state';
import Loader from "../components/Loader";
import { myFetch } from "../../utils/Myfetch";
import { useNavigate } from "react-router-dom";
import { CartItem, Product } from "../types";
import '../css/cart.css';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const user = useSelector((state: any) => state.user);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [quantities, setQuantity] = useState<any>()
  const [product_ids, setProduct_id] = useState<any>()
  const [user_id, setUser_id] = useState<any>()
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(                    
      cartItems.reduce((acc, item: CartItem) => acc + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  const handleDelete = () => {
    dispatch(deleteCart());
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

  const handleRemoveFromCart = (product: Product) => {
    dispatch(deleteOneProduct(product.id));
    enqueueSnackbar(`Item removed from your Cart`, {
      variant: "warning",
      autoHideDuration: 1500,
    });0
  };

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
      const data = await response.json();3
      if (response.ok) {
        if (data) {
          dispatch(deleteCart());
          enqueueSnackbar(`${data.message}`, {
            variant: "success",
            autoHideDuration: 1500,
          });
        } else {
          const error = data?.msg || "Something went wrong, please try again later";
          if (error.msg === "Token has expired") {
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
    } catch (error: Error | any) {
      enqueueSnackbar(`${error?.response?.data?.error || "Failed to place order. Please try again later"}`, {
        variant: "error",
        autoHideDuration: 1500,
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="cart">
      <h2 className="cart__title">Cart Items</h2>
      {cartItems.length === 0 ? (
        <div  className=" vh-100 d-flex  justify-content-center align-items-center flex-column">
          <p>Your Cart is empty</p>
          <Link to={"/"}>
            <button className="btn btn-primary">Shop now</button>
          </Link>
        </div>
      ) : (
        <div className="row mt-5">
          <div className="col-md-8">
            {cartItems.map((item: CartItem) => (
              <div className="card mb-3 w-50 p-.5 mt-20" key={item.id}>
                <div className="d-flex align-items-center">
                  {/* <div className="col-md-4">
                    <img src={item.product_pic} alt={item.name} className="img-fluid" />
                  </div> */}
                  <div className="col-md-8">
                    <div className="card-body">
                      <p className="card-title">{item.name}</p>
                      <p className="card-text">Ksh {item.price}</p>
                      <div onClick={() => handleRemoveFromCart(item)} className="remove_one_cart">
                        <span>
                          <button className="btn btn-danger rounded-0">Delete </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card w-75">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <p className="card-text">Your Total: Ksh {totalAmount}</p>
                <button className="btn btn-success rounded-0" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
                <button onClick={() => handleDelete()} className="btn btn-danger d-flex align-items-center mt-3 rounded-0">Delete Cart</button>
              </div>
            </div>
          </div>
        </div>    
      )}
    </div>
  );
};

export default Cart;