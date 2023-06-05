import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";


const Product_Store = ({ product }:any) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);    
  }; 

  return (
    <Card key={product.id}>
      <Card.Body>
        <Row>
          <Col xs="12">
            <h5>{product.name}</h5>
          </Col>
          <Col xs="12">
            <p>{product.description}</p>
          </Col>
          <Col xs="12">
            <h5>${product.price}</h5>
          </Col>
          <Col xs="12">
            <Button variant="primary" onClick={handleEditProduct}>
              Edit Product
            </Button>
          </Col>
        </Row>
      </Card.Body>
      <EditProductModal
        product={product}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      />
    </Card>
  );
};

const EditProductModal = ({ product, isOpen, onClose }:any) => {
  return (
    <div>
      <h4>Edit Product</h4>
      <form onSubmit={() => {      

        onClose();
      }}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={(e) => {
            product.name = e.target.value;
          }}
        />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={(e) => {
            product.description = e.target.value;
          }}
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={(e) => {
            product.price = e.target.value;
          }}
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

const StockKeepingPage = () => {
  const [products, setProducts] = useState();
  const access_token = localStorage.getItem("token");


  useEffect(() => {
    const fetchProducts = async () => {
        const response = await fetch("https://stockify-store-management.vercel.app/products",{
            method: "GET",
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
        });
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    }
    fetchProducts();
    
  }, []);

  return (
    <Container>
      <h1>Stock Keeping Page</h1>
      <Row>
        { products.map((product: any) => (
          <Product_Store key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default StockKeepingPage;