import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart,AiOutlineStock } from 'react-icons/ai';
import {FcSalesPerformance} from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import { Rootstate, setLogout } from '../state';
import { CartItem } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import CartModal from '../components/CartModal';
import { Nav, Navbar } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {MdOutlineSell} from 'react-icons/md';

const AppNavbar = () => {
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const isAuth = Boolean(useSelector((state: any) => state.token));
  const user = useSelector((state: any) => state.user);
  const ref = useRef(null);
  const [openCartModal, setOpenCartModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const { pathname } = location;

    if (pathname === '/cart_modal') {
      setOpenCartModal(false);
    } else {
      setOpenCartModal(false);
    }
  }, [location]);

  const openCart = () => {
    setOpenCartModal(true);
    console.log(openCartModal);
  };

  const logout = () => {
    dispatch(setLogout());
    navigate('/login');
  };

  const HandleNavigate = () =>{
    navigate('/profile');
    handleClose();
  }

  return (
    <>
    {isAuth && (
       <Navbar collapseOnSelect expand="lg"  variant="tertiary" style={{top:0, position:"sticky", zIndex:1}}>
         <Navbar.Brand as={Link} to="/" className="navbar-brand p-2">
           Home
         </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto p-2">
               <>
                 <Nav.Link as={Link} to="/stocks" className={location.pathname === '/stocks' ? 'active' : ''}>
                   <span><AiOutlineStock size={30}/></span>
                    <p>Stocks</p>
                 </Nav.Link>
                 <Nav.Link as={Link} to="/sales" className={location.pathname === '/sales' ? 'active' : ''}>
                   <span><MdOutlineSell size={30}  /></span>
                   <p>Sales</p>
                 </Nav.Link>
                 <Nav.Link onClick={openCart} className="cart">
                    <span><AiOutlineShoppingCart size={30}/></span>
                    <p>Cart
                    {cartItems.length > 0 && ` (${cartItems.length})`}
                    </p>
                 </Nav.Link>
                 <Nav.Link onClick={handleShow} className="user">
                   <span> <img src={ user.user_image} alt="user_image" style={{width: '40px', height: '40px',borderRadius: '50%' }}/></span>
                   <p>{user.username}</p>
                 </Nav.Link>
                 <Modal
                     show={show}
                     onHide={handleClose}
                     dialogClassName="modal-right"
                     animation={true}
                  >
                  <Modal.Header closeButton>
                       <Modal.Title>User Profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <Card.Body className=''>
                        <div className="d-flex align-items-center justify-content-between">
                          <Card.Title> {user.username}</Card.Title>
                            <img  src={ user.user_image} alt="user_image" style={{width: '40px', height: '40px',borderRadius: '50%' }}/>
                        </div>
                          <Card.Text className='mt-2'>
                            {user.email}
                          </Card.Text>
                      </Card.Body>
                      
                     {/* button to link to the profile page */}
                     <Button variant="primary" onClick={HandleNavigate} className='mt-4'>
                        View profile
                     </Button>
                   </Modal.Body>
                   <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                         Close
                     </Button>
                     <Button variant="primary" onClick={logout}>
                         Logout
                     </Button>
                   </Modal.Footer>
                </Modal>
               </>
           </Nav>
          <Nav>
         </Nav>
        </Navbar.Collapse>
         {openCartModal && <CartModal setOpenCartModal={setOpenCartModal} />}
      </Navbar>
    )}
    </>
  );
};

export default AppNavbar;