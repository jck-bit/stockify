import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../state';
import Loader from '../components/Loader';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import '../css/loginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          dispatch(
            setLogin({
              user: data.user,
              token: data.access_token
            })
          );
          navigate('/');
          enqueueSnackbar(data.message, { variant: 'success', autoHideDuration: 1500 });
        }
      } else {
        const error = data?.message || 'Login failed. Please try again.';
        enqueueSnackbar(error, { variant: 'error', autoHideDuration: 1500 });
      }
      setIsLoading(false);
    } catch (err) {
      const error = 'Failed to reach the server. Please try again later.';
      enqueueSnackbar(error, { variant: 'error', autoHideDuration: 1500 });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }

    setEmail('');
    setPassword('');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="login-container">
      <h1>Stockify</h1>
      <p>manage user sales</p>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FloatingLabel>
        <div className="register_div">
          <p>
            <Link to="/privacy_policy">Privacy policy</Link>
          </p>
          <p>
            <Link to="/register">Need an account ?</Link>
          </p>
        </div>
        <div className='button-container'>
          <Button type="submit" className="login_btn" variant="primary">Login</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
