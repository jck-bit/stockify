import  { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rootstate, deleteCart, deleteOneProduct } from '../state';
import Loader from "./EditLoader";
import { CartItem, Product } from "../types";
import { useSnackbar } from "notistack";
import { myFetch } from "../../utils/Myfetch";
import '../css/modal.css'
import CartComponent from "./CartComponent";
import ChekOutCard from "./ChekOutCard";


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
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const user = useSelector((state: any) => state.user);


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
             <div className="text-center border-bottom pb-2 w-100">
               <h6 className="">There are no more items in your cart</h6>
             </div>
            ):(
              <>
              <CartComponent/>

              <ChekOutCard/>

              <div className="card-checkoout d-flex justify-content-between align-items-center mt-2" >
              <button
              type="button"
              className="btn btn-warning"
              onClick={() => setOpenCartModal(false)}
              style={{margin: "0 auto",color:"#fff", border:"none", textTransform:"uppercase",  padding:"10px 20px"}}
            >
              back
            </button> 
            <button
             type="button"
             className="btn btn-warning"
             style={{margin: "0 auto",color:"#fff", border:"none", textTransform:"uppercase", padding:"10px 20px"}}
             onClick={() => handleCheckout()}
            >
              checkout
            </button>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;