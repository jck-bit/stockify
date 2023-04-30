import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import {  BiLogOut } from 'react-icons/bi';
import { useSelector,useDispatch } from 'react-redux';
import { Rootstate,setLogout } from '../state';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const isAuth = Boolean(useSelector((state:any) => state.token))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setLogout());
    navigate('/login');
  }

  return (
    <nav className='navbar_homepage'>
      <ul className='unordered_list_nav'>
        <li>
          <Link to='/products'>shop</Link>
        </li>
        <li>
          <Link to='/sales'>Sales</Link>
        </li>
        <li>
          <Link to='/cart'>
            <span className='cart_icon'><BsCart4 /></span>
            
            <span className='cart_text'>
              Cart{isAuth && cartItems.length > 0 && ` (${cartItems.length})`}
            </span>
          </Link>
        </li>
        {isAuth && (
                  <li>
                  <div className='logout_container' onClick={logout}>
                    <span className='logout_icon'>
                        <BiLogOut/>
                      </span>
                    <span>Logout</span>
                  </div>
                </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;