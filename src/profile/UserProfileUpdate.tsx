import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfileUpdate() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState<any>();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

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
      const response = await fetch('http://127.0.0.1:5000/users/profile', {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      // Update user profile successfully
      // Handle success as needed (e.g. show success message)
    } catch (error:any) {
      // Handle error
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Username:</label>
        <input 
          type="text"
          name="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input 
         type="email" 
         name="email" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Image File:</label>
        <input
         type="file" 
         name="image-file" 
         onChange={(e) => setImageFile(e.target.files?.[0])} />
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default UserProfileUpdate;
