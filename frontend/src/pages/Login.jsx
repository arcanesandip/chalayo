import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Added simple client-side check: username 'su' and password 'su' -> dashboard
    // (This is intentionally simple for demo/testing purposes.)
    if (formData.username.trim() === 'su' && formData.password === 'su') {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Login Container */}
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>InvoicePro</span>
            </h1>
            <p className="login-subtitle">Access your billing dashboard</p>
          </div>

          {/* Body */}
          <div className="login-body">
            {/* Error Message (shown when credentials are invalid) */}
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle error-icon"></i>
                <span className="error-text">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Username Field */}
              <div className="form-group">
                <label htmlFor="id_username" className="form-label">
                  <i className="fas fa-user label-icon"></i>
                  Username
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="id_username"
                    className="form-input"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="id_password" className="form-label">
                  <i className="fas fa-key label-icon"></i>
                  Password
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <i className="fas fa-key"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="id_password"
                    className="form-input form-input-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                    aria-label="Toggle password visibility"
                  >
                    <i
                      className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Submit Button (reusable) */}
              <Button type="submit" className="login-submit-button">
                <i className="fas fa-sign-in-alt"></i>
                <span>Sign In</span>
              </Button>
            </form>

            {/* Footer */}
            <div className="login-footer">
              <a href="/admin/" className="admin-link">
                <i className="fas fa-cog"></i>
                <span>Admin Access</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
