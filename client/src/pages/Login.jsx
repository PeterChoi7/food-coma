import React, { useState } from 'react';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function Login() {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("username", username);
      navigate("/");
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
      <h2>Login</h2>
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
