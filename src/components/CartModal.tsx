import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rootstate, deleteCart, deleteOneProduct } from '../state';
import Loader from "./EditLoader";
import { CartItem, Product } from "../types";
import { useSnackbar } from "notistack";
import { myFetch } from "../../utils/Myfetch";
import '../css/modal.css'

interface Props {
  setOpenCartModal: (openCartModal: boolean) => void;
}

const CartModal = ({ setOpenCartModal }: Props) => {
  const dispatch = useDispatch()
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [quantities, setQuantity] = useState<any>()
  const [product_ids, setProduct_id] = useState<any>()
  const [user_id, setUser_id] = useState<any>()
  const { enqueueSnackbar } = useSnackbar();
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const user = useSelector((state: any) => state.user);


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
      const data = await response.json();
      if (response.ok) {
        if (data) {
          dispatch(deleteCart());
          enqueueSnackbar(`${data.message}`, {
            variant: "success",
            autoHideDuration: 1500,
          });
        } else {
          const error = data?.msg || "Something went wrong, please try again later";
          enqueueSnackbar(`${error}`)
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

  return (
    <div className="modal come-from-modal right fade"  role="dialog" style={{display: 'block', opacity: 1}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={() => setOpenCartModal(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">
              Cart
            </h4>
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p>There are no items in your cart</p>
            ):(
              <div className="cart-items">
                {/* map through the items of the cart and create a card for each item  */}
                {cartItems.map((item: CartItem) => (
                  <div className="card mb-2">
                  <div className="card-body d-flex  align-items-center">
                    <div className="mr-5">
                    <img src={item.product_pic} alt={item.name} className="card-img" style={{width: '100px', height: '100px', marginRight:"10px"}}/>
                    </div>
                    <div className="card-details" style={{flexGrow:1, marginBottom:"10px"}}>
                      <h5 className="card-title">{item.name}</h5>
                      <h6 className="card-subtitle mb-2">{item.description}</h6>
                      <div className="card-text"> KES {item.price}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-danger btn-sm btn-remove mb-1 rounded-0" onClick={() => handleRemoveFromCart(item)} style={{width:"60%", margin: "0 auto"}}>
                      Remove
                    </button>
                  </div>
                </div>
                
                ))}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              onClick={() => setOpenCartModal(false)}
            >
              Close
            </button> 
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;