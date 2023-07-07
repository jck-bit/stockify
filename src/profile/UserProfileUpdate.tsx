import { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { myFetch } from '../../utils/Myfetch';
import { useSelector } from 'react-redux';

function UserProfileUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state:any) => state.user)
  const FileInputRef = useRef<any>()
  const [selectedImage, setSelectedImage] = useState<any>();


  const { enqueueSnackbar } = useSnackbar();

  const disabledButton = () =>{
    //if all the fields are empty return true
    if ( !email || !username ) {
      return true;
    }
  }

  const handleButtonChooseFile = () =>{
    FileInputRef.current.click();
  }

  const handleFileChange = (e:any) => {
    const file = e.target.files?.[0];
   if (file){
    setImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
   }
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
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
      const response:any = await myFetch('https://stockify-store-management.vercel.app/users/profile', {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });

      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message)
      }
         
      if(response.ok){
        enqueueSnackbar(`${data.message}`, { variant: 'success' })
      }
      
      if(data.msg === "Token has expired"){
        localStorage.removeItem('token')
        navigate('/login')
      }

      const {user , token} = data
      dispatch(setLogin({user, token}))

      setIsLoading(false)
    } catch (err:any) {
      const error = err?.message || 'Something went wrong';
      enqueueSnackbar(`${error}`, { variant: 'error' })
      setIsLoading(false)
    }

    setEmail('')
    setUsername('')
    setImageFile(undefined)
  };

  if(isLoading){
    return <Loader />
  }

  return (
    <div className='login-container'>    
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="mb-3 d-flex justify-content-between align-items-center">
    {selectedImage ? (
        <img src={selectedImage} alt="selected_image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      ) : (
        <img src={user.user_image} alt="default_image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      )}
      <Form.Group controlId='formFile' className="mb-3">
        <Form.Control
          type='file'
          ref={FileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
         <button type="button" className="btn btn-primary" onClick={handleButtonChooseFile}>
          Select Image
        </button>
      </Form.Group>
    </div> 
    <FloatingLabel controlId="floatingInput" label="username" className="mb-3">
          <Form.Control
            type="username"
            placeholder="nameexample.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            isInvalid={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|COM)$/i.test(email)}
          />
          <Form.Control.Feedback type="invalid">Invalid email address</Form.Control.Feedback>
        </FloatingLabel>
            
      <Button type="submit" className="_btn" variant="primary">Save</Button>
    </Form>
    </div>
  );
}

export default UserProfileUpdate;