import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding } from "react-icons/fa";
import "./Registration.css";

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";

const API_BASE_URL = process.env.REACT_APP_USE_RENDER === "true" ? RENDER_API_BASE_URL : LOCAL_API_BASE_URL;

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    company: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          company: formData.company,
        }),
      });

      console.log('Registration Response Status:', response.status);
      const data = await response.json();
      console.log('Registration Response Data:', data);

      if (response.ok) {
        console.log("Registration successful:", data);
        localStorage.setItem('token', data.token);
        navigate("/login");
      } else {
        setError(data.message || data.error || "Registration failed");
        console.error("Registration failed:", data);
      }
    } catch (err) {
      console.error("Registration error details:", err);
      setError("Registration failed. Please check your connection and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-header">
          <h1 className="registration-title">Create Your Account</h1>
          <p className="registration-subtitle">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          {error && <p className="error-message">{error}</p>}
          
          <div className="input-group">
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="registration-input"
                required
              />
            </div>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="registration-input"
                required
              />
            </div>
          </div>

          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="registration-input"
              required
            />
          </div>

          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="registration-input"
              required
            />
          </div>

          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="registration-input"
              required
            />
          </div>

          <div className="input-wrapper">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="registration-input"
              required
            />
          </div>

          <div className="input-wrapper">
            <FaBuilding className="input-icon" />
            <input
              type="text"
              name="company"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={handleInputChange}
              className="registration-input"
            />
          </div>

          <button
            type="submit"
            className="registration-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Registering...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="registration-footer">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="login-link-button"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
