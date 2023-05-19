import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, CartItem } from '../types';
import { setProducts, addToCart, deleteOneProduct, Rootstate, setLogout } from '../state';
import image from '../assets/images/store.png';
import { useNavigate } from 'react-router-dom';
import { myFetch } from '../../utils/Myfetch';
import '../css/products.css';

const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const products = useSelector((state: any) => state.products);
  const access_token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getProducts = async () => {
    const response: any = await myFetch("https://stockify-store-management.vercel.app/products", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setProducts({ products: data.products }));
    } else {
      const errorData = await response.json();
      if (errorData?.msg === "Token has expired") {
        //Navigating to the login page
        dispatch(setLogout());
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product }));
  };

  const handleRemoveFromCart = (product: Product) => {
    dispatch(deleteOneProduct(product.id));
  };

  return (
    <div className="container">
      <div className="row product-list">
        {products && products.map((product: Product) => {
          return (
            <div key={product.id} className="col-md-4 col-sm-6">
              <div className="card product mb-3">
                <div className="row g-0">
                  <div className="col-4">
                    <div className="product_image">
                      <img src={product.product_pic} alt="" className="card-img-top product-image" />
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="card-body product-details">
                      <div className="descrptions">
                        <h2 className="card-title product-name">{product.name}</h2>
                        <span className="product-price">{product.price} Ksh</span>
                      </div>
                      {cartItems.some((p: CartItem) => p.id === product.id) ? (
                        <button className="remove-from-cart btn btn-danger" onClick={() => handleRemoveFromCart(product)}>
                          Remove from cart
                        </button>
                      ) : (
                        <button className="add-to-cart btn btn-primary" onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
