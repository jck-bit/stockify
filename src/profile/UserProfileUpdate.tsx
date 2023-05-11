import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { myFetch } from '../../utils/Myfetch';

function UserProfileUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  

  const { enqueueSnackbar } = useSnackbar();

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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Username</label>
        <input 
          type="text"
          name="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required
          />

        <label>Email</label>
        <input 
         type="email" 
         name="email" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)} 
         required
         />
      
    
        <label>Image File</label>
        <input
         type="file" 
         name="image-file" 
         onChange={(e) => setImageFile(e.target.files?.[0])} 
         />
      
      <button type="submit">Update Profile</button>
    </form>
    </div>
  );
}

export default UserProfileUpdate;
