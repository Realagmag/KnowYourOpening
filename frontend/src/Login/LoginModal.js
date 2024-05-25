import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginModal.css";
import { useToken } from "./../contexts/TokenContext";

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setToken } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });
      setToken(response.data.jwtToken);
      setError(null);
      setUsername("");
      setPassword("");
      onClose();
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className={`login-modal ${isOpen ? "open" : ""}`}>
      <div className="login-content">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
