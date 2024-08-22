import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Component/Home';
import Signup from './Component/Signup';
import Login from './Component/Login';
import MyContext from './Context';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    setUser(null); // Set the user to null to log out
    navigate('/Login'); // Redirect to the login page
  };

  return (
    <>
      {console.log(user)}
      <MyContext.Provider value={{ user, setUser }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">CountDown</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                {user ? (
                  <>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/Login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Signup" className="nav-link">Signup</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
}

export default App;
