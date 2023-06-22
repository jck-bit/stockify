import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, CartItem } from '../types';
import { setProducts, addToCart, deleteOneProduct, Rootstate, setLogout } from '../state';
import { useNavigate } from 'react-router-dom';
import { myFetch } from '../../utils/Myfetch';
import '../css/products.css';
import AddModal from '../components/AddModal';
import CountCart from '../components/CountCart';

const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const products = useSelector((state: any) => state.products);
  const productsState = useSelector((state: any) => state.products);
  const access_token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  useEffect(() => {
    setProducts(productsState);
  }, [productsState]);

  const getProducts = async () => {
    const response: any = await myFetch("https://stockify-store-management.vercel.app/products", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
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
      {/* a plus sign to add a new product on the top right corner */}
      <div className="row">
        <div className="row">
          <div className="col-12">
            <button className="btn btn-success rounded-0" onClick={() => handleModal()} style={{ marginTop: "10px", marginBottom: "10px" }}>
              + Add a new product
            </button>
          </div>
        </div>
      </div>
      <div className="row product-list">
        {products && products.map((product: Product) => {
          return (
            //if product.quantity is null the display is none
            <div key={product.id} className="col-lg-3 col-sm-6 col-10" style={{ display: product.quantity === null ? "none" : "flex", flexDirection: "column" }}>
                <div className="card mb-3" style={{ flex: "1 1 auto" }}>
                  <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div className="product_image">
                      <img src={product.product_pic} alt="" className="img-fluid img-thumbnail rounded w-100" style={{  objectFit: "cover"}} />
                    </div>
                    <div className="descrptions">
                      <h6 className="title" style={{textTransform: "uppercase"}}>{product.name}</h6>
                      <p className="card-text">{product.description}</p>
                      <span className="product-price mb-2">KES {product.price}</span>
                    </div>
                    <div className="buttons-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {cartItems.some((p: CartItem) => p.id === product.id) ? (
                        <CountCart product ={product}/>
                      ) : (
                        <button className="btn btn-warning rounded-0" onClick={() => handleAddToCart(product)} style={{ width: "80%", marginLeft: "10%", marginTop: "" }}>
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
            </div>

          );
        })}
      </div>
      {isModalOpen && <AddModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Products;