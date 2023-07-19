import React from 'react';
import { CartItem,Product } from '../types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch,useSelector } from 'react-redux';
import { Rootstate,addToCart, deleteOneProduct } from '../state'


type MyVerticallyCenteredModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  product: Product;
};

const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = ({ show, onHide, product}) => {
  // const dispatch = useDispatch();
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <Modal.Title>
            {product.name}
         </Modal.Title>
         <p>{product.description}</p>
       { cartItems.some((p: CartItem) => p.id === product.id) ? (
                // if product is remaining one in the cart
                <div className="card-buttons-container d-flex align-items-center">
                  <button className='btn btn-danger'>remove From cart</button>
                </div>
              ) : (
                <Button className="btn btn-warning">
                  Add to Cart
                </Button>
              )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;