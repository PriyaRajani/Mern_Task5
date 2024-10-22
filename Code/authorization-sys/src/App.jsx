import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Admin from './components/admin';
import User from './components/user';
import ProtectedRoute from './components/protectedroute';
import Login from './components/login';
import './index.css'; 

const App = () => {
  const [user, setUser ] = useState(null); 

  return (
    <div className="container">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          {user && (
            <>
              <Link to="/admin">Admin</Link>
              <Link to="/user">User  </Link>
              <LogoutButton setUser ={setUser } />
            </>
          )}
        </nav>

        <Routes>
        
          <Route
            path="/"
            element={<Home user={user} />}
          />
          
        
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          
        
          <Route
            path="/user"
            element={
              <ProtectedRoute user={user} allowedRoles={['user', 'admin']}>
                <User  />
              </ProtectedRoute>
            }
          />
          
         
          <Route path="/login" element={<Login setUser ={setUser } />} />

         
          <Route path="/unauthorized" element={<h1 className="unauthorized">Unauthorized Access</h1>} />
        </Routes>
      </Router>
    </div>
  );
};


const LogoutButton = ({ setUser  }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser (null); 
    navigate('/'); 
  };

  return <button onClick={handleLogout}>Logout</button>;
};


const Home = ({ user }) => {
  const navigate = useNavigate();

  
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome Back!</h1>
      {user ? (
        <p>You are logged in as: <strong>{user.role}</strong></p>
      ) : (
        <>
          <p>Please log in to access protected routes.</p>
          <button onClick={goToLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default App;