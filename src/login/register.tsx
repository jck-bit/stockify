import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Loader from '../components/Loader';

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  const disabledButton = () =>{
    //if all the fields are empty return true
    if (!username || !email || !password || !confirmPassword) {
      return true;
    }
    //if the password and confirm password do not match return true
    if (password !== confirmPassword) {
      return true;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }


    setLoading(true);
    try {
      const res = await fetch('https://stockify-store-management.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data) {
          enqueueSnackbar(`${data.message}`, { variant: 'success' });
          navigate('/login');
        }
      } else {
        const error = data?.message || 'Something went wrong';
        enqueueSnackbar(error, { variant: 'error' });
      }
      setLoading(false);
    } catch (err) {
      const error = 'Failed to reach the server. Please try again later.';
      enqueueSnackbar(error, { variant: 'error', autoHideDuration: 1500 });
      setLoading(false);
    }
    setPassword('');
    setEmail('');
    setUsername('');
    setConfirmPassword('');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="login-container">
      <h1>Stockify</h1>
      <p>Register to manage and view user sales</p>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Email" className='mb-3'>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            //if the email is not valid
            isInvalid={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|COM)$/i.test(email)}
          />
          <Form.Control.Feedback type="invalid">Invalid email address</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Username" className='mb-3'>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">Username is required</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3'>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            ///if the password does not contain a number, a special charcter and less than 6 characters
            isInvalid={
              password.length < 6 ||
              !/[A-Z]/.test(password) ||
              !/[a-z]/.test(password) ||
              !/[0-9]/.test(password)
            }
          />
          <Form.Control.Feedback type="invalid"> Password must contain atleast 6 characters,<br/> one uppercase, one lowercase and one number</Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Confirm Password">
          <Form.Control
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMismatch(false);
            }}
            required
            //if its not equal to the password
            isInvalid={password !== confirmPassword}
          />
          {passwordMismatch && (
            <Form.Control.Feedback type="invalid">Passwords do not match</Form.Control.Feedback>
          )}
        </FloatingLabel>
        <div className="register_div">
          <p>
            <Link to="/privacy_policy">Privacy Policy</Link>
          </p>
          <p>
            <Link to="/login">Already have an Account?</Link>
          </p>
        </div>
        <div className="button-container"> <Form.Control.Feedback type="invalid">Passwords do not match</Form.Control.Feedback>
          <Button type="submit" className="register-button" disabled={disabledButton()}> 
            Create Account
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
