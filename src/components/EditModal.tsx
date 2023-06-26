import React, { useState } from 'react';
import { Product } from '../types';
import { myFetch } from '../../utils/Myfetch';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import EditLoader from './EditLoader';
import { EditProduct, DeleteProduct } from '../state';

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
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  
  const dispatch = useDispatch();

  const access_token = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = {
      id: selectedProduct.id,
      name,
      quantity,
      description,
      price,
      image,
    };

    try {
      setLoading(true);
      const response = await myFetch(
        `https://stockify-store-management.vercel.app/products/${selectedProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        if (data) {
          enqueueSnackbar(`${data.message}`, {
            variant: 'success',
            autoHideDuration: 1500,
          });
          setIsModalOpen(false);
          dispatch(EditProduct({ product: productData }));
        } else {
          console.log('error');
          enqueueSnackbar(`Something went wrong`, {
            variant: 'error',
            autoHideDuration: 1500,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error updating product:', error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await myFetch(
        `http://localhost:5000/products/${selectedProduct.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data.message);
      if (response.ok) {
        if (data) {
          dispatch(DeleteProduct({ id: selectedProduct.id }));
          console.log(data.message);
          enqueueSnackbar(`${data.message}`, {
            variant: 'success',
            autoHideDuration: 1500,
          });
          setIsModalOpen(false);
        } else {
          console.log(data.message);
          enqueueSnackbar(`${data.message}`, {
            variant: 'error',
            autoHideDuration: 1500,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      setLoading(false);
    }
  };

  const hasChangedFields =
  name !== selectedProduct.name ||
  quantity !== selectedProduct.quantity ||
  description !== selectedProduct.description ||
  price !== selectedProduct.price ||
  image !== null;

  return (
    <div className="modal" style={{ display: selectedProduct ? 'block' : '' }}>
      {loading && <EditLoader />}
      <div className="modal-dialog modal-dialog">
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
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="submit" className="btn btn-primary rounded-0" disabled={!hasChangedFields}>
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-0 float-right"
                  onClick={handleDelete}
                >
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