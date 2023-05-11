import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {setLogin} from '../state'
import Loader from '../components/Loader'
import '../loginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch()
    const{enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isloading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        setIsLoading(true);
        const res = await fetch('https://stockify-store-management.vercel.app/login', {
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
              token: data.access_token
            }));
            console.log(data.access_token)
            navigate('/');
            enqueueSnackbar(data.message, { variant: "success", autoHideDuration:1500 });
          }
        } else {
          const error = data?.message || "Login failed. Please try again.";
          enqueueSnackbar(error, { variant: 'error', autoHideDuration:1500 });
        }
        setIsLoading(false);
      } catch (err) {
        const error = "Failed to reach the server. Please try again later.";
        enqueueSnackbar(error, { variant: 'error', autoHideDuration:1500 });
        setIsLoading(false);
      }finally{
        setIsLoading(false)
    }

    setEmail("")
    setPassword("")
  }

  if(isloading){
    return <Loader/>
  }

  return (
      <div className="login-container">
        <h1>Stockify</h1>
        <p>manage user sales</p>
        <form onSubmit={handleSubmit}>
          <label>
            email
            <input 
              type="email" 
              name="email" 
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
              required />
          </label>
          <label>
            Password
            <input  
              type="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </label>
          <div className='register_div'>
            <p>
              <Link to={"/privacy_policy"}>
                Privacy policy
              </Link>
            </p>
            <p>
              <Link to={"/register"}>
                Need an account ?
              </Link>
            </p>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
  );
};

export default LoginPage;