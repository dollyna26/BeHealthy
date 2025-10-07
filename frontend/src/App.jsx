import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { setAuthToken } from './api';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('bh_token');
    setAuthToken(token);
  }, []);

  return (
    <div className="app">
      <nav className="nav">
        <div className="brand">BeHealthy</div>
        <div className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<div className="hero"><h1>Welcome to BeHealthy</h1><p>Your daily health tracker — dark theme.</p></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
