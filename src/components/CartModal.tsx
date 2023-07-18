import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { Rootstate, deleteCart } from '../state';
import { CartItem } from "../types";
import '../css/modal.css';
import CartComponent from "./CartComponent";
import ChekOutCard from "./ChekOutCard";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from 'react-icons/gr';

interface Props {
  setOpenCartModal: (openCartModal: boolean) => void;
}

const CartModal = ({ setOpenCartModal }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);

  const handleDelete = () => {
    dispatch(deleteCart());
  };

  const handleNavigate = () => {
    if (cartItems.length > 0) {
      navigate('/cart_modal');
    }
  };

  const handleClose = () => {
    setOpenCartModal(false);
  };

  return (
    <Modal show={true} onHide={handleClose} className="come-from-modal right" animation={true}>
      <div className="modal-dialog slide-from-right">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center pt-4">
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
              }}
              type="button"
              className="close close_modal_button mt-3"
              onClick={handleClose}
              aria-label="Close"
            >
              <span aria-hidden="true" style={{ border: "1px solid #bababa", borderRadius: "5px", padding: "0.5rem", color: "#333" }}>
                <GrFormClose size={20} color="#333" />
              </span>
            </button>
            <h4 className="modal-title" id="myModalLabel" style={{ color: "#333", textTransform: "uppercase" }}>
              Shopping Cart
            </h4>
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <div className="text-center border-bottom pb-2 w-100">
                <h6 className="">Hmmmm.... it looks like your cart is empty. Find yourself an item!</h6>
              </div>
            ) : (
              <>
                <CartComponent />

                <div style={{ backgroundColor: '#f7f7f7' }}>
                  <ChekOutCard />
                  <div className='text-center pb-2'>
                    <Button
                      variant='warning'
                      className='btn-block'
                      onClick={handleDelete}
                      style={{ textTransform: 'uppercase', color: '#fff', width: '50%' }}
                    >
                      Empty Cart
                    </Button>
                  </div>
                </div>

                <div className="card-checkoout d-flex justify-content-between align-items-center mt-2">
                  <Button
                    variant="warning"
                    onClick={handleClose}
                    style={{ margin: "0 auto", color: "#fff", border: "none", textTransform: "uppercase", padding: "10px 20px" }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="warning"
                    style={{ margin: "0 auto", color: "#fff", border: "none", textTransform: "uppercase", padding: "10px 20px" }}
                    onClick={handleNavigate}
                  >
                    Proceed to checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
