import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { myFetch } from '../../utils/Myfetch';
import { useSelector } from 'react-redux';

function UserProfileUpdate(): JSX.Element {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: any) => state.user)
  const FileInputRef = useRef<any>()
  const [selectedImage, setSelectedImage] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [isFormDirty, setIsFormDirty] = useState(false); 
 
  useEffect(() =>{
    setEmail(user.email)
    setUsername(user.username)
  },[user])



  const CancelButton = () => {
    setImageFile("")
    setSelectedImage("")
    setEmail('')
    setUsername('')
  }

  const handleButtonChooseFile = () => {
    FileInputRef.current.click();
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      // Handle case where user is not logged in
      navigate('/login');
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    try {
      setIsLoading(true)
      const response: any = await myFetch('https://stockify-store-management.vercel.app/users/profile', {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message)
      }

      if (response.ok) {
        enqueueSnackbar(`${data.message}`, { variant: 'success' })
      }

      const { user, token } = data
      dispatch(setLogin({ user, token }))

      setIsLoading(false)
    } catch (err: any) {
      const error = err?.message || 'Something went wrong';
      enqueueSnackbar(`${error}`, { variant: 'error' })
      setIsLoading(false)
    }

    setEmail('')
    setUsername('')
    setImageFile(undefined)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormDirty(true); 
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='login-container'>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3 d-flex justify-content-between align-items-center">
          {selectedImage ? (
            <img src={selectedImage} alt="selected_image" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          ) : (
            <img src={user.user_image} alt="default_image" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          )}
          <Form.Group controlId='formFile' className="mb-3">
            <Form.Control
              type='file'
              ref={FileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button type="button" className="btn btn-primary" onClick={handleButtonChooseFile}>
              Choose Image
            </button>
          </Form.Group>
        </div>
        <FloatingLabel controlId="floatingInput" label="username" className="mb-3">
          <Form.Control
            name="username"
            type="username"
            placeholder="username"
            value={username}
            required
            onChange={handleInputChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={handleInputChange}
            required
            isInvalid={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com)$/i.test(email)}
          />
          <Form.Control.Feedback type="invalid">Invalid email address</Form.Control.Feedback>
        </FloatingLabel>

        <div className="d-flex justify-content-between align-items-center">
          <Button type="submit" className="_btn" variant="primary" disabled={!isFormDirty}>Save</Button>
          <Button type="button" className="_btn" variant="secondary" onClick={CancelButton}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
}

export default UserProfileUpdate;