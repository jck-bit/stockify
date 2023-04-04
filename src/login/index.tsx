import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {setLogin} from '../state'
import '../loginPage.css';


const LoginPage = () => {
    const dispatch = useDispatch()
    const{enqueueSnackbar} = useSnackbar()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
          const res = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
          });

          const data = await res.json();
          enqueueSnackbar(data.message, { variant: "success", autoHideDuration:1500 });
          console.log(data);

        } catch (err:any) {
          enqueueSnackbar(err.message, { variant: 'error', autoHideDuration:1500 });

        }
      }
      

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            username:
            <input 
              type="username" 
              name="username" 
              value={username}
              onChange={(e) =>setUsername(e.target.value)}
              required />
          </label>
          <label>
            Password:
            <input  
              type="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="animation-container">
        <div className="animation-content">
          <div className="animation-circle"></div>
          <div className="animation-circle"></div>
          <div className="animation-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
