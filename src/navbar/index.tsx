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
import useOnClickOutside from '../../utils/outsideClick';
import CartModal from '../components/CartModal';
import { Nav, Navbar } from 'react-bootstrap';

const AppNavbar = () => {
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const isAuth = Boolean(useSelector((state: any) => state.token));
  const user = useSelector((state: any) => state.user);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const [openCartModal, setOpenCartModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleImageClicked = () => {
    setShowModal(!showModal);
  };

  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <Navbar collapseOnSelect expand="lg" bg="body" variant="tertiary" style={{borderBottom: '1px solid #ccc', paddingBottom: '10px'}}>
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        Products
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {isAuth && (
            <>
              <Nav.Link as={Link} to="/stocks" className={location.pathname === '/stocks' ? 'active' : ''}>
                Stock
              </Nav.Link>
              <Nav.Link as={Link} to="/sales" className={location.pathname === '/sales' ? 'active' : ''}>
                Sales
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {isAuth && (
            <>
              <Nav.Link onClick={openCart} className="cart">
                <BsCart4 />
                Cart
                {cartItems.length > 0 && ` (${cartItems.length})`}
              </Nav.Link>
              <Nav.Link onClick={handleImageClicked} className="user-image">
                <BsPerson />
                {user?.username}
              </Nav.Link>
            </>
          )}
          {showModal && (
            <div className="modal_container" onClick={() => setShowModal(true)}>
              <div className="modal_box" onClick={(e) => e.stopPropagation()}>
                <div className="logout_container" onClick={logout}>
                  <BiLogOut />
                  Logout
                </div>
                <div className="logout_container">
                  <Link to={'/profile'} className={location.pathname === '/profile' ? 'active' : ''}>
                    <IoMdSettings />
                    Profile
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
      {openCartModal && <CartModal setOpenCartModal={setOpenCartModal} />}
    </Navbar>
  );
};

export default AppNavbar;
