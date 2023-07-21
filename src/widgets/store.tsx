import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';
import { Product } from '../types';
import { myFetch } from '../../utils/Myfetch';
import EditModal from '../components/EditModal';

const OnlineStore = () => {
  const [products, setProducts] = useState([]);
  const access_token = localStorage.getItem('token');
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productsState = useSelector((state: any) => state.products);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setProducts(productsState);
  }, [productsState]);

  const fetchProducts = async () => {
    try {
      const response = await myFetch('https://stockify-store-management.vercel.app/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <h4>Stocks Keeping</h4>
      <div className="row">
        {products.map((product: Product) => (
          <div className="col-lg-3 p-2 col-sm-4 col-10" key={product.id}>
            <Card className="mb-4 h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.quantity === null ? 'Out of stock' : product.quantity + ' in stock'}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: KES {product.price}</Card.Text>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => handleEdit(product)} style={{ width: '80%', marginLeft: '10%' }}>
                    Edit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {isModalOpen && <EditModal selectedProduct={selectedProduct} setIsModalOpen={setIsModalOpen} />}
    </Container>
  );
};

export default OnlineStore;
