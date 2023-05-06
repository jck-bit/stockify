import {  useState } from 'react';

function UserProfileUpdate() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState<any>();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    // Make sure all required fields are filled out
    if (!username || !email) {
      setErrorMessage('Please fill out all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/users/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
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
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="image-file">Image File:</label>
        <input type="file" id="image-file" onChange={(e) => setImageFile(e.target.files?.[0])} />
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default UserProfileUpdate;
