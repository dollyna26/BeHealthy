import React, { useState } from 'react';
import API, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('bh_token', res.data.token);
      setAuthToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="card small">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className="btn primary">Login</button>
      </form>
    </div>
  );
}
