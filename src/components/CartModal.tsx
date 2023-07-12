import { useSelector, useDispatch } from "react-redux";
import { Rootstate, deleteCart } from '../state';
import { CartItem } from "../types";
import '../css/modal.css'
import CartComponent from "./CartComponent";
import ChekOutCard from "./ChekOutCard";
import { useNavigate } from "react-router-dom";
import {GrFormClose} from 'react-icons/gr'
interface Props {
  setOpenCartModal: (openCartModal: boolean) => void;
}

const CartModal = ({ setOpenCartModal }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);

           
  const handleDelete = () => {
    dispatch(deleteCart());
  };

  const HandleNavigate = () =>{
     if (cartItems.length > 0){
       navigate('/cart_modal')
     }
  }

  return (
    <div className="modal come-from-modal right fade"   role="dialog" style={{display: 'block', opacity: 1, zIndex: 9999}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center pt-4">
            <button
              style={{
                 backgroundColor:"transparent", 
                 border:"none", 
                 outline:"none", 
                                 
              }}
              type="button"
              className="close close_modal_button mt-3"
              onClick={() => setOpenCartModal(false)}
              aria-label="Close"
            >
              <span aria-hidden="true" style={{ border:"1px solid #bababa", borderRadius:"5px", padding:"0.5rem", color:"#333"}}>
              <GrFormClose size={20} color="#333"/>
              </span>
            </button>
            <h4 className="modal-title" id="myModalLabel" style={{color: "#333", textTransform:"uppercase",}}>
              Shopping Cart
            </h4>
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
             <div className="text-center border-bottom pb-2 w-100">
               <h6 className="">Hmmmm.... it looks like your cart is empty. Find yourself an item!</h6>
             </div>
            ):(
              <>
              <CartComponent />
               
              <div style={{ backgroundColor: '#f7f7f7' }}>
                <ChekOutCard />
                <div className='text-center pb-2'>
                  <button
                    className='btn btn-warning btn-block'
                    onClick={handleDelete}
                    style={{ textTransform: 'uppercase', color: '#fff', width: '50%' }}
                  >
                    Empty Cart
                  </button>
                </div>
              </div>

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
             onClick={() => HandleNavigate()}
            >
              Proceed to checkout
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