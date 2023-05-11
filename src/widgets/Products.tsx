import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Product, CartItem} from '../types'
import  { setProducts, addToCart,deleteOneProduct ,Rootstate, setLogout} from '../state'
import image from  "../assets/images/store.png"
import { useNavigate } from 'react-router-dom';
import { myFetch } from '../../utils/Myfetch';

const Products =  () => {
  const dispatch = useDispatch();
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const products = useSelector((state:any) => state.products)
  const access_token = localStorage.getItem("token");
  const navigate = useNavigate();
  

  const getProducts = async () => {
    const response:any = await myFetch( "https://stockify-store-management.vercel.app/products", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    if (response.ok){
      const data = await response.json();
      console.log(data?.products)
      dispatch(setProducts({products:data.products}))
    }else{
      const errorData = await response.json();
      if(errorData?.msg === "Token has expired"){
        //Navigating to the login page
        dispatch(setLogout());
        navigate("/login");
      }
    }
  }

  useEffect(() =>{
    getProducts();
  
  },[])

  const handleAddToCart =(product:any) =>{
    dispatch(addToCart({product}));
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(deleteOneProduct(product.id))
  }

  return (
    <div className="container">
    <div className="welcome_banner">
      <div className="shop_now">
        <h1>shop now</h1>
      </div>
      <img src={image} alt="" />
    </div>
    <div className='product-list'>
      {products && products.map((product:Product) => {
        console.log(product)
        return (
          <div key={product.id} className='product'>
            <div className="product_image">
                <img src={product.product_pic} alt=""  className='product-image'/>
              </div>
            <div className="product-details">
              <div className="descrptions">
                <h2 className='product-name'>{product.name}</h2>
                <span className="product-price">{product.price} Ksh</span>
              </div>
              {cartItems.some((p) => p.id === product.id) ? (

              <button
                className="remove-from-cart" 
                onClick={() =>
                handleRemoveFromCart(product)
              }>remove from cart
              </button>
              ):(
              <button 
                className="add-to-cart" 
                onClick={() =>
                handleAddToCart(product)
              }>Add to Cart
              </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Products
