
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../index.css';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hardcoded users for demo purposes
  const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ];

  const InputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const Submit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      setUser({ role: user.role }); // Set user role after successful login
      setIsAuthenticated(true);
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  // Redirect to the home page after successful login
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={Submit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={InputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={InputChange}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
