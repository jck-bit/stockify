import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { Rootstate, setLogout } from '../state';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import useOnClickOutside from '../../utils/outsideClick';

const Navbar = () => {
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const isAuth = Boolean(useSelector((state: any) => state.token));
  const user = useSelector((state: any) => state.user);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setLogout());
    navigate('/login');
  };

  const handleImageClicked = () => {
    setShowModal(!showModal);
  };

  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <nav className="navbar_homepage" ref={ref}>
      <ul className="unordered_list_nav">
        <li>
          <Link to="/">shop</Link>
        </li>
        <li>
          <Link to="/sales">Sales</Link>
        </li>
        <li>
          <Link to="/cart">
             <span className="cart_icon">
              <BsCart4 />
            </span>

            <span className="cart_text">
              Cart
              {isAuth && cartItems.length > 0 && ` (${cartItems.length})`}
            </span>
          </Link>
        </li>
        {isAuth && (
          <li>
            <div
              className="user_image_container"
              onClick={handleImageClicked}
            >
              <span className="">{user?.username}</span>
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
                    <span className="logout_icon">
                      <IoMdSettings />
                    </span>
                    <Link to={'/profile'}>
                      <span>settings</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
