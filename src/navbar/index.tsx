import {Link } from 'react-router-dom'
import { BsCart4} from 'react-icons/bs'
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { cart } = useSelector((state:any) => state)
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
              {cart.length > 0 && (
                <div className="cart_item">
                  {cart.length}
                </div>
              )}
            </li>
        </ul>
    </nav>
  )
}

export default Navbar