import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import {  BiLogOut } from 'react-icons/bi';
import { useSelector,useDispatch } from 'react-redux';
import { Rootstate,setLogout } from '../state';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';
import {useState } from 'react';


const Navbar = () => {
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const isAuth = Boolean(useSelector((state:any) => state.token))
  const user = useSelector((state:any) => state.user)
  const  [showModal, setShowModal] = useState(false);

  console.log(user?.user_image)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setLogout());
    navigate('/login');
  }

  const handleImageClicked =() =>{
    setShowModal(!showModal)
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
          <div className="user_image_container" onClick={handleImageClicked}>
            <img src={user?.user_image} alt="" className="user_image" />
          </div>
          {showModal && (
            <div className="modal_container" onClick={() => setShowModal(false)}>
              <div className="modal_box" onClick={(e) => e.stopPropagation()}>
                <span className='modal_username'> hi {user?.username}</span>
                  <div className='logout_container' onClick={logout}>
                    <span className='logout_icon'>
                        <BiLogOut/>
                    </span>
                    <span>Logout</span>
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