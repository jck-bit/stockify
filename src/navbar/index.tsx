import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsCart4, BsPerson } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
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

  return (
    <>
    {isAuth && (
         <Navbar collapseOnSelect expand="lg"  variant="tertiary" style={{top:0, position:"sticky", zIndex:1}}>
         <Navbar.Brand as={Link} to="/" className="navbar-brand p-3">
           Products
         </Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="ms-auto" style={{marginRight:"20px",  display:"flex" ,alignItems:"center"}}>
               <>
                 <Nav.Link as={Link} to="/stocks" className={location.pathname === '/stocks' ? 'active' : ''}>
                   Stock
                 </Nav.Link>
                 <Nav.Link as={Link} to="/sales" className={location.pathname === '/sales' ? 'active' : ''}>
                   Sales
                 </Nav.Link>
                 <Nav.Link onClick={openCart} className="cart">
                   <BsCart4 />
                   Cart
                   {cartItems.length > 0 && ` (${cartItems.length})`}
                 </Nav.Link>
                 <Nav.Link onClick={handleShow} className="user">
                 <img src={ user.user_image} alt="user_image" style={{width: '40px', height: '40px',borderRadius: '50%' }}/>
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
                      <p className='text-uppercase'></p>
                      <Card>
                       <Card.Body>
                         <Card.Title> {user.username}</Card.Title>
                         <Card.Text></Card.Text>
                       </Card.Body>
                      </Card>
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