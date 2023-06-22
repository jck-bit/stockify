import ChekOutCard from '../components/ChekOutCard';
import CartComponent from '../components/CartComponent';
import { myFetch } from "../../utils/Myfetch";
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { Rootstate, deleteCart } from '../state';
import { CartItem } from '../types';
import EditLoader from '../components/EditLoader'
import {HiHome} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

const CheckoutCart = () => {
    const [product_ids, setProduct_id] = useState<any>()
    const [user_id, setUser_id] = useState<any>()
    const [quantities, setQuantity] = useState<any>()
    const [isloading, setIsLoading] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
    const user = useSelector<Rootstate, any>(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        setQuantity(
          cartItems.map(item => item.quantity)
        );
        setProduct_id(
          cartItems.map(item => item.id)
        )
        setUser_id(user.id);
      }, [cartItems, user]); 


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
    <div className='container'>
        {isloading && <EditLoader />}
      <h1>Shopping Cart</h1>
      <div className='row'>
        <div className='col-lg-7 col-md-12 mb-4'>
          <div className={cartItems.length === 0 ? "d-none" : " card p-3"}>
            <CartComponent />
          </div>
          <div 
            className='mt-3 d-flex justify-content-center p-3' 
            style={{
                width:"50%", 
                backgroundColor:"orange", 
                color:"#fff",fontSize:"18px",  
                borderRadius:"5px", 
                textTransform:"uppercase",
                textAlign:"center",
                cursor:"pointer"
            }}
            onClick={() => navigate("/")}
            >
               <HiHome size={25}/>
               <p style={{margin:0}}>continue shopping</p>
            </div>
        </div>
        <div className='col-lg-5 col-md-12'>
          <div className='card p-3'>
            <ChekOutCard />
            <div className='text-center' style={{width:"80%", margin:"0 auto"}}>
            <button
             type="button"
             className="btn btn-warning"
             style={{width:"80%", margin:"0 auto",color:"#fff", border:"none", textTransform:"uppercase"}}
             onClick={() => handleCheckout()}
            >
              Checkout
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;