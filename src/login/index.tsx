import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {setLogin} from '../state'
import '../loginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch()
    const{enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        const res = await fetch('https://stockify-store-management-git-flaskapi-jck-bit.vercel.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
    
        const data = await res.json();
        if (res.ok) {
          if (data) {
            dispatch(setLogin({
              user: data.user,
              token: data.accessToken
            }));
            console.log(data.accessToken)
            navigate('/');
            enqueueSnackbar(data.message, { variant: "success", autoHideDuration:1500 });
          }
        } else {
          const error = data?.message || "Login failed. Please try again.";
          enqueueSnackbar(error, { variant: 'error', autoHideDuration:1500 });
        }
      } catch (err) {
        const error = "Failed to reach the server. Please try again later.";
        enqueueSnackbar(error, { variant: 'error', autoHideDuration:1500 });
      }
    }
    
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            email:
            <input 
              type="email" 
              name="email" 
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
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