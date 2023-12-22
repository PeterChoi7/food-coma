import React, { useState } from 'react';
import axios from "axios";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: 'fit-content',
    padding: '20px',
    gap: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginTop: '20px'
  };

  const inputStyle = {
    padding: '8px 15px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '200px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label>
            Username:
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </label>
        </div>
        <div>
          <button type="submit" style={{ padding: '8px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
