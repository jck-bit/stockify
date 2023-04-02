import {Link } from 'react-router-dom'
import { BsCart4} from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { Rootstate, CartItem } from '../state';

const Navbar = () => {
  const { cart } = useSelector((state:any) => state)
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  return (
    <nav className='navbar_homepage'>
        <ul className='unordered_list_nav'>
            <li>
              <Link to="/products">Home</Link>
            </li>
            <li>
              <Link to="/sales">sales</Link>
            </li>
            <li>
              <Link to="/cart">cart
                <span><BsCart4/></span>
                {cartItems.length > 0 && (
                  <div className="cart_item">
                    {cartItems.length}
                  </div>
                )}
              </Link>
              
            </li>
        </ul>
    </nav>
  )
}

export default Navbar