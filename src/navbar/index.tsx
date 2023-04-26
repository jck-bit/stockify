import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import {  BiLogOut } from 'react-icons/bi';
import { useSelector,useDispatch } from 'react-redux';
import { Rootstate,setLogout } from '../state';
import { CartItem } from '../types';


const Navbar = () => {
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setLogout());
  }

  return (
    <nav className='navbar_homepage'>
      <ul className='unordered_list_nav'>
        <li>
          <Link to='/products'>Home</Link>
        </li>
        <li>
          <Link to='/sales'>Sales</Link>
        </li>
        <li>
          <Link to='/cart'>
            <span className='cart_icon'><BsCart4 /></span>
            <span className='cart_text'>
              Cart{cartItems.length > 0 && ` (${cartItems.length})`}
            </span>
          </Link>
        </li>
        <li>
          <div className='logout_container' onClick={logout}>
            <span className='logout_icon'>
                <BiLogOut/>
              </span>
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;