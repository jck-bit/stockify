import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { myFetch } from '../../utils/Myfetch';

const OnlineStore = () => {
  const [products, setProducts] = useState([]);
  const access_token = localStorage.getItem('token');
 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await myFetch('https://stockify-store-management.vercel.app/products',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }       
      });
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container">
      <h1>Online Store Stock Keeping</h1>
      <div className="row">
        {products.map((product:Product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-primary">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineStore;
