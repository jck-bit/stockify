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
    <div className="" style={{marginTop:"15px",  borderTop:" 1px solid #D3D3D3", backgroundColor:"#f7f7f7", padding:"10px",}}>
      <p className="text-center title p-1" 
       style={{backgroundColor: "#d1ecf1" ,width:"80%", margin: "0 auto", marginTop:"10px", color: "#0c5460", marginBottom:"10px"}}>
        There are {cartItems.length} items in your cart
       </p>
    <div className="body">
     <div className="total d-flex justify-content-between align-items-center" style={{ borderTop:" 1px solid #D3D3D3"}}>
      <p className="title">subtotal</p>
      <p className="text">KES {totalAmount}</p>
     </div>
     <div className="delivery d-flex justify-content-between align-items-center mt-2">
      <p>Delivery</p>
      <p>Free</p>
     </div>
     <div className="delivery d-flex justify-content-between align-items-center mt-2">
      <p className="title" style={{fontWeight: "bold"}}>Total (tax incl.)</p>
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