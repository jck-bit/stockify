import React, { useState } from 'react';
import { Product } from '../types';
import { myFetch } from '../../utils/Myfetch';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import EditLoader from './EditLoader';
import { EditProduct, DeleteProduct } from '../state';

interface AddProductModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const AddModal = ({setIsModalOpen}: AddProductModalProps)  => {
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    
    return (
        <div className="modal" style={{display: 'block'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Product</h5>
                <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      
                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      
                    />
                    <small id="emailHelp" className="form-text text-muted mt-1">
                      Price is in Ksh
                    </small>
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="image">Product Image</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="image"
                      
                    />
                  </div>
                  <div className="modal-footer d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary rounded-0">
                      Save Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default AddModal