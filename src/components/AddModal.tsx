import React, { useState } from 'react';
import { myFetch } from '../../utils/Myfetch';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import EditLoader from './EditLoader';
import { addProduct} from '../state';

interface AddProductModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const AddModal = ({setIsModalOpen}: AddProductModalProps)  => {
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState<any>();
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<any>('');
    const [image, setImage] = useState<File>();

    const access_token = localStorage.getItem('token');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('price', price);
    
        if(image) {
            formData.append('image', image);
        }
    

    try {
        setIsLoading(true);
        const response = await myFetch('https://stockify-store-management.vercel.app/products', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            body: formData            
        });
        const data = await response.json();
        if (response.ok){
            console.log(data);
            setIsModalOpen(false);
            dispatch(addProduct({product: data.product}));
            enqueueSnackbar(`${data.message}`, {variant: 'success'});
        }else{
            enqueueSnackbar(`${data.message}`, {variant: 'error'});
        }
        setIsLoading(false);
    } catch (error) {
        console.log(error);
        enqueueSnackbar(`${error}`, {variant: 'error'})
        setIsLoading(false);
    }
}
    return (
        <div className="modal" style={{display: 'block'}}>
            {isLoading && <EditLoader />}
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Product</h5>
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
                      onChange={(e) =>setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      value={quantity}
                      onChange={(e) =>setQuantity(e.target.value)}                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) =>setDescription(e.target.value)}                     
                      
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      value={price}
                      onChange={(e) =>setPrice(e.target.value)}
                      
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
                      onChange={(e) =>setImage(e.target.files![0])}
                      
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