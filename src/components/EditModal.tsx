import React, {useState} from 'react'
import { Product } from '../types';
import { myFetch } from '../../utils/Myfetch';

type EditModalProps = {
    selectedProduct: Product;
    setIsModalOpen: (isModalOpen: boolean) => void;
  };

  
const EditModal = ({selectedProduct, setIsModalOpen}:EditModalProps) => {
    const [name, setName] = useState(selectedProduct.name)
    const [quantity, setQuantity] = useState(selectedProduct.quantity);
    const [description, setDescription] = useState(selectedProduct.description);
    const [price, setPrice] = useState(selectedProduct.price);

    //const [isModalOpen, setIsModalOpen] = useState(false);
    const access_token = localStorage.getItem('token')

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Make API request to update the product with the new values
        try {
          const response = await myFetch(`https://stockify-store-management.vercel.app/products/${selectedProduct.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
              name,
              quantity,
              description,
              price
            })
          });
          // Handle the response and update the products list
          // ...
          // Close the modal
          setIsModalOpen(false);
        } catch (error) {
          console.error('Error updating product:', error);
        }
      };
    

    return (
        //if the model is open show product else show nothing
         
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
                  {/* Render form fields with their respective values and onChange handlers */}
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
                        onChange={(e) => setQuantity(parseInt(e.target.value))}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input 
                        type="number" 
                        className="form-control" 
                        id="price" 
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}/>
                        <small id="emailHelp" className="form-text text-muted mt-1">
                            Price is in Ksh
                        </small>
                    </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default EditModal