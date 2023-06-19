import  { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Rootstate,deleteCart  } from "../state"
import { CartItem } from '../types'


const ChekOutCard = () => {

    const [totalAmount, setTotalAmount] = useState(0);
    const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        setTotalAmount(                    
          cartItems.reduce((acc, item: CartItem) => acc + item.price * item.quantity, 0)
        );
      }, [cartItems]);

      const handleDelete = () => {
        dispatch(deleteCart());
      };


  return (
    <div className="card">
    <p className="text-center card-title p-1" style={{backgroundColor: "#d1ecf1" ,width:"80%", margin: "0 auto", marginTop:"10px", color: "#0c5460"}}>There are {cartItems.length} items in your cart</p>
    <div className="card-body">
     <div className="card-total d-flex justify-content-between align-items-center">
      <p className="card-title">subtotal</p>
      <p className="card-text">KES {totalAmount}</p>
     </div>
     <div className="card-delivery d-flex justify-content-between align-items-center mt-2">
      <p>Delivery</p>
      <p>Free</p>
     </div>
     <div className="card-delivery d-flex justify-content-between align-items-center mt-2">
      <p className="card-title" style={{fontWeight: "bold"}}>Total (tax incl.)</p>
      <p style={{fontWeight: "bold"}}>KES {totalAmount}</p>
     </div>
    </div>
    <button 
      className="btn btn-warning btn-block"  
      onClick={() => handleDelete()}
      style={{width:"60%", margin: "0 auto", marginTop:"10px",textTransform: "uppercase", marginBottom:"10px", color:"#fff"}}>
        Empty Cart
     </button>
  </div>
  )
}

export default ChekOutCard