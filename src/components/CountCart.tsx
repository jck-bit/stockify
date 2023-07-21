import { Rootstate, DecrementQuantity, IncrementQuantity } from '../state';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem, Product } from "../types"

interface PassedProps {
    product: Product | CartItem
}

const CountCart = ({product}:PassedProps) => {
    const dispatch = useDispatch()
    const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);

    const handleIncrement = (product: Product) => {
        dispatch(IncrementQuantity({ product }));
      }
      
      const handeDecrement = (product: Product) => {
        dispatch(DecrementQuantity({product}))
      }
  return (
    <div className='input-group bootstrap-touchspin mt-2' style={{ width: "80%" }}>
    <div className="d-flex" style={{border:"1px solid #bababa", borderRadius:"2px",}}>

      <button 
        className="btn btn-outline-secondary bootstrap-touchspin-down rounded-0" 
        style={{border:"none",backgroundColor:"#e0e0e0" ,color:"black", zIndex:0}} onClick={() => handeDecrement(product)}>
        -
      </button>
         <input 
          type="text" 
          className="form-control text-center outline-none border-0" 
          style={{width:"50px", outline:"none", border:"none",  color:"black", backgroundColor:"transparent"}} 
          value={cartItems.find((p: CartItem) => p.id === product.id)?.quantity}
          />
      <button 
        className="btn btn-outline-secondary bootstrap-touchspin-up rounded-0" 
        style={{border:"none", backgroundColor:"#e0e0e0", color:"black", zIndex:0}} onClick={() => handleIncrement(product)}>
          +
      </button>
    </div>
  </div>
  )
}

export default CountCart