import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './cssDashbord/login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const udata = localStorage.getItem('user');

    if (udata === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    // Disable scroll when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(res.data));
        } else {
          setError('Invalid credentials');
        }
      })
      .catch((error) => {
        
        setError('An error occurred');
        alert('Wrong email or password');
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container-login">
      <div className="login-form">
        <h1>Login</h1>
          {error && <p className="error">{error}</p>}
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
