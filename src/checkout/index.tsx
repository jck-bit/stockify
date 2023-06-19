import ChekOutCard from '../components/ChekOutCard';
import CartComponent from '../components/CartComponent';

const CheckoutCart = () => {
  return (
    <div className='container'>
      <h1>Shopping Cart</h1>
      <div className='row'>
        <div className='col-lg-7 col-md-12 mb-4'>
          <div className='card p-3'>
            <CartComponent />
          </div>
        </div>
        <div className='col-lg-5 col-md-12'>
          <div className='card p-3'>
            <ChekOutCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;