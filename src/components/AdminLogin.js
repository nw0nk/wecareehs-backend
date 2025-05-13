import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaSpinner, FaEnvelope, FaLock } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import './AdminLogin.css';

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";

const API_BASE_URL = process.env.REACT_APP_USE_RENDER === "true" ? RENDER_API_BASE_URL : LOCAL_API_BASE_URL;

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      adminLogin(data.token, data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <FaUserShield className="admin-login-icon" />
          <h2>Admin Portal</h2>
          <p className="admin-login-subtitle">Secure Access Only</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label>Email</label>
            <div className="admin-input-wrapper">
              <FaEnvelope className="admin-input-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
                placeholder="Enter admin email"
            />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Password</label>
            <div className="admin-input-wrapper">
              <FaLock className="admin-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
                placeholder="Enter password"
            />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-error-message">
              <FaSpinner className="admin-error-icon" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="admin-spinner" /> Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>For authorized personnel only</p>
          <a href="/">Back to Main Site</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
