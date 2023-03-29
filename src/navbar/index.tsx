import React  from 'react'
import { Outlet, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar_homepage'>
        <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/sales">sales</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar