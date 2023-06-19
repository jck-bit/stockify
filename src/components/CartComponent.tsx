import { useSelector } from 'react-redux'
import { CartItem,Product } from '../types'
import { Rootstate,deleteOneProduct } from '../state'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useSnackbar } from "notistack";

const CartComponent = () => {
    const dispatch  = useDispatch()
    const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
    const { enqueueSnackbar } = useSnackbar();

    const handleRemoveFromCart = (product: Product) => {
        dispatch(deleteOneProduct(product.id));
        enqueueSnackbar(`Item removed from your Cart`, {
          variant: "warning",
          autoHideDuration: 1500,
        });
      };

  return (
    <div className="cart-items">

    {cartItems.map((item: CartItem) => (
      <div style={{borderTop:"0.5px solid #D3D3D3",  width:"100%" ,paddingBottom:"5px", paddingTop:"5px"}}>
      <div className="card-body d-flex  justify-content-between align-items-center">
        <div className="mr-5">
          <img src={item.product_pic} alt={item.name} className="card-img" style={{width: '100px', height: '100px', marginRight:"10px"}}/>
        </div>
        <div className="card-details" style={{flexGrow:1, marginBottom:"10px"}}>
          <h5 className="card-title">{item.name}</h5>
          <h6 className="card-subtitle mb-2">{item.description}</h6>
          <div className="card-text"> KES {item.price}</div>
        </div>
        <div className="trash-icon" style={{cursor:"pointer"}}>
        <BsFillTrash3Fill
          onClick={() => handleRemoveFromCart(item)}
          style={{ transition: "color 0.3s" ,width:"20px", height:"20px", marginRight:"0", marginLeft:"20px"}}
          size={20}
       />
      </div>
      </div>
    </div> 
    ))}
  </div>  
  )
}

export default CartComponent