import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa"; 
import "./LoginPage.css";
import { AuthContext } from "../../context/AuthContext";

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";

const API_BASE_URL = process.env.REACT_APP_USE_RENDER === "true" ? RENDER_API_BASE_URL : LOCAL_API_BASE_URL;

const LoginPage = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();
  const { login }               = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {  // Corrected to /api/auth/login
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || "Invalid credentials"}`);
      } else {
        login(data.token, data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    navigate("/admin/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please sign in to continue</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                className="login-input"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="login-message">{message}</p>}

        <div className="login-footer">
          <div className="login-links">
            <Link to="/register" className="login-link">
              Don't have an account? Register
            </Link>
          </div>
          <div className="admin-login-section">
            <p className="admin-text">Are you an admin?</p>
            <button
              onClick={handleAdminLogin}
              className="admin-login-button"
            >
              <FaUserShield className="admin-icon" /> Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
