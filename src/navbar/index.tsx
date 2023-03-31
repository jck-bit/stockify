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
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/sales">sales</Link>
            </li>
            <li>
              <Link to="/cart">cart</Link>
              <span><BsCart4/></span>
              {
                <div className="cart_item">
                  {cartItems?.length}
                </div>
              }
            </li>
        </ul>
    </nav>
  )
}

export default Navbar