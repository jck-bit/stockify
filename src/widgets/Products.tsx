import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Product, CartItem} from '../types'
import  { setProducts, addToCart,deleteOneProduct ,Rootstate} from '../state'
import { useSnackbar } from 'notistack';
import image from  "../assets/images/store.png"

const Products =  () => {
  const dispatch = useDispatch();
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const products = useSelector((state:any) => state.products)
  const { enqueueSnackbar } = useSnackbar();

  const getProducts = async () => {
    const response = await fetch( "https://stockify-store-management.vercel.app/products", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    dispatch(setProducts({products: data.products}));
  };
  
  useEffect(() =>{
    getProducts()
  },[])

  const handleAddToCart =(product:any) =>{
    dispatch(addToCart({product}));
    enqueueSnackbar(`product added to your cart successfully`,{
      variant:"success",
      autoHideDuration:2000,
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(deleteOneProduct(product.id))
    enqueueSnackbar(`Item removed from your Cart`, {
      variant: "warning",
      autoHideDuration: 2000
    })
  }

  return (
    <div className="container">
    <div className="welcome_banner">
      <h1>shop now</h1>
      <img src={image} alt="" />
    </div>
    <div className='product-list'>
      {products && products.map((product:Product) => {
        if (product.quantity < 1){
          return null
        }
        return (
          <div key={product.id} className='product'>
            <div className="product-details">
              <h2 className='product-name'>{product.name}</h2>
              <p className='product-description'>{product.quantity} units remaining</p>
              <div className="product-price">{product.price} Ksh</div>
              
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
