import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './cssDashbord/logout.css'; 

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('user');
    // Disable scroll when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="logout-container">
      <h1>You have been logged out</h1>
      <Link to="/login" className="login-link">Login again</Link>
    </div>
  );
};

export default Logout;
