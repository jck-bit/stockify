import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Product} from '../types'
import  { setProducts, addToCart,deleteOneProduct, CartItem ,Rootstate} from '../state'
import { useSnackbar } from 'notistack';


const Products =  () => {
  const dispatch = useDispatch();
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const products = useSelector((state:any) => state.products)
  const { cart } = useSelector((state:any) => state)
  const { enqueueSnackbar } = useSnackbar();

  const getProducts = async () => {
    const response = await fetch( "http://127.0.0.1:5000/products", {
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
      autoHideDuration:1000,
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(deleteOneProduct(product.id))
    enqueueSnackbar(`Item removed from your Cart`, {
      variant: "warning",
      autoHideDuration: 1000
    })
  }

  return (
    <div className='product-list'>
      {products && products.map((product:Product) => {
        return (
          <div key={product.id} className='product'>
            <div className="product-details">
              <h2 className='product-name'>{product.name}</h2>
              <p className='product-description'>{product.quantity} units remaining</p>
              <div className="product-price">{product.price} Ksh</div>
              
              {cartItems.some((p:any) => p.id === product.id) ? (

              <button
                className="remove-from-cart" 
                onClick={() =>
                handleRemoveFromCart(product)
              }>remove Item
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
  )
}

export default Products