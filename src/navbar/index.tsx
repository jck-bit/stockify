import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { Rootstate, setLogout } from '../state';
import { CartItem } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import useOnClickOutside from '../../utils/outsideClick';
import CartModal from '../components/CartModal';


const Navbar = () => {
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const isAuth = Boolean(useSelector((state: any) => state.token));
  const user = useSelector((state: any) => state.user);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const[opencartModal, setOpenCartModal] = useState(false);


  const opencart = () =>{
    setOpenCartModal(true);
    console.log(opencartModal)
  }

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setLogout());
    navigate('/login');2
  };

  const handleImageClicked = () => {
    setShowModal(!showModal);
  };

  useOnClickOutside(ref, () => setShowModal(false));

  return (
    // user cannot see the navbar without being authenticated
    

    <nav className="navbar_homepage" ref={ref}>
      {isAuth && (
      <ul className="unordered_list_nav">
        <li> 
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            products
          </Link>
        </li>
        <li> 
          <Link to="/stocks" className={location.pathname === '/stocks' ? 'active' : ''}>
            stock
          </Link>
        </li>
        <li>
          <Link to="/sales" className={location.pathname === '/sales' ? 'active' : ''}>
            Sales
          </Link>
        </li>
        <li>
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
             <span className="cart_icon">
              <BsCart4 />
            </span>

            <span className="cart_text">
              Cart
              {isAuth && cartItems.length > 0 && ` (${cartItems.length})`}
            </span>
          </Link>
        </li>
        <li className='cart' onClick={() => opencart()}>
          <span className="" style={{color:'#fff', fontSize:'20px',  cursor:'pointer'}}>cart</span>
        </li>
        {isAuth && (
          <li>
            <div
              className="user_image_container"
              onClick={handleImageClicked}
            >
              <span style={{color:'#fff'}}>{user?.username}</span>
              <img src={user?.user_image} alt="" className="user_image" />
            </div>
            {showModal && (
              <div
                className="modal_container"
                onClick={() => setShowModal(true)}
              >
                <div
                  className="modal_box"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="logout_container" onClick={logout}>
                    <span className="logout_icon">
                      <BiLogOut />
                    </span>
                    <span>Logout</span>
                  </div>
                  <div className="logout_container">
                    <Link to={'/profile'} className={location.pathname === '/profile' ? 'active' : ''}>
                    <span className="logout_icon">
                      <IoMdSettings />
                    </span>
                      <span>profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>
        )}
      </ul>
      )}
      {opencartModal && <CartModal setOpenCartModal={setOpenCartModal}/>}
    </nav>
  );
};

export default Navbar;
