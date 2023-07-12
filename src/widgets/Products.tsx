import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, CartItem } from '../types';
import { setProducts, addToCart, deleteOneProduct, Rootstate, setLogout } from '../state';
import { useNavigate } from 'react-router-dom';
import { myFetch } from '../../utils/Myfetch';
import AddModal from '../components/AddModal';
import CountCart from '../components/CountCart';
import {BsFillTrash3Fill} from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import MyVerticallyCenteredModal from '../components/ShowProduct';

const Products = (props:any) => {
  const dispatch = useDispatch();
  const cartItems = useSelector<Rootstate, CartItem[]>(state => state.cart);
  const products = useSelector((state: any) => state.products);
  const productsState = useSelector((state: any) => state.products);
  const access_token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [modalShow, setModalShow] = useState(false);

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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalShow(true);
  };

  return (
    <Container>
    {/* a plus sign to add a new product on the top right corner */}
    <div className="row">
      <div className="row">
        <div className="col-12">
          <Button className="btn btn-success rounded-0" onClick={handleModal} style={{ marginTop: '10px', marginBottom: '10px' }}>
            + Add a new product
          </Button>
        </div>
      </div>
    </div>
    <div className="row product-list">
      {products &&
        products.map((product: Product) => {
          return (
            // if product.quantity is null, the display is none
            <div key={product.id} className="col-lg-3 col-sm-6 col-10" style={{ display: product.quantity === null ? 'none' : 'flex', flexDirection: 'column' }}>
              
              <Card 
               className="mb-3 shadow-sm p-3 mb-5 bg-body  rounded hover-effect" 
               onClick={() => handleProductClick(product)}
                style={{ flex: '1 1 auto', cursor:"pointer" }}>
                  
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="product_image">
                    <Card.Img variant="top" src={product.product_pic} alt="" className=" rounded w-100" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="descrptions">
                    <Card.Title as="h6" style={{ textTransform: 'uppercase' }}>
                      {product.name}
                    </Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <span className="product-price mb-2">KES {product.price}</span>
                  </div>
                 
                  <div className="buttons-container p-2 mb-2" onClick={(e) => e.stopPropagation()}>
                    {cartItems.some((p: CartItem) => p.id === product.id) ? (
                      // if product is remaining one in the cart
                      <div className="card-buttons-container d-flex align-items-center">
                        <CountCart product={product} />
                        <div>
                          <BsFillTrash3Fill
                            onClick={(e) =>{
                              e.stopPropagation(); // Prevent event bubbling
                              handleRemoveFromCart(product)
                            }}
                            style={{ transition: 'color 0.3s', width: '20px', height: '20px', marginLeft: '20px', cursor: 'pointer' }}
                            size={20}
                          />
                        </div>
                      </div>
                    ) : (
                      <Button className="btn btn-warning rounded-0" 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        handleAddToCart(product);
                      }}
                       style={{ width: '80%', marginLeft: '10%', marginTop: '' }}>
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </div>

    {selectedProduct && (
      <MyVerticallyCenteredModal
      show= {modalShow}
      onHide={() => setModalShow(false)}
      title={selectedProduct.name}
      content={
        <>
          <h4>Product Details</h4>
          <p>{selectedProduct.description}</p>
          {/* Additional product details */}
        </>
      }
    />
  )}
    {isModalOpen && <AddModal setIsModalOpen={setIsModalOpen} />}
  </Container>
  );
};

export default Products;