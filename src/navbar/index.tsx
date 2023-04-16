import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Rootstate } from '../state';
import { CartItem } from '../types';

const Navbar = () => {
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
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
      </ul>
    </nav>
  );
};

export default Navbar;