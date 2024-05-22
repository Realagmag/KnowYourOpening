import React from "react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`login-modal ${isOpen ? "open" : ""}`}>
      <div className="login-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
          <button type="submit">Login</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
