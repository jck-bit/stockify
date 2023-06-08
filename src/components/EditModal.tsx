import React, { useState } from 'react';
import { Product } from '../types';
import { myFetch } from '../../utils/Myfetch';
import Loader from './Loader';
//`https://stockify-store-management.vercel.app/products/${selectedProduct.id}

interface EditModalProps {
  selectedProduct: Product;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const EditModal = ({ selectedProduct, setIsModalOpen }: EditModalProps) => {
  const [name, setName] = useState(selectedProduct.name);
  const [quantity, setQuantity] = useState<number | any>(selectedProduct.quantity);
  const [description, setDescription] = useState(selectedProduct.description);
  const [price, setPrice] = useState(selectedProduct.price);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const access_token = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name,
      quantity,
      description,
      price,
      image,
    };

    try {
      setLoading(true);
      const response = await myFetch(`http://localhost:5000/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log('Product updated successfully');
      setIsModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.error('Error updating product:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="modal" style={{ display: selectedProduct ? 'block' : '' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <small id="emailHelp" className="form-text text-muted mt-1">
                  Price is in Ksh
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="image">Product Image</label>
                <input type="file" className="form-control-file" id="image" onChange={(e) => setImage(e.target.files?.[0] || null)} />
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="submit" className="btn btn-primary rounded-0">
                  Save Changes
                </button>
                <button type="button" className="btn btn-danger rounded-0 float-right" onClick={() => setIsModalOpen(false)}>
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

