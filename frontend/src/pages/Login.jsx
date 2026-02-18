import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Login.css'

const styles = {
  loginPage: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--gradient-page)',
    padding: 'var(--space-4)',
  },
  loginWrapper: {
    width: '100%',
    maxWidth: '28rem',
  },
  loginCard: {
    overflow: 'hidden',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--color-bg-surface)',
    boxShadow: 'var(--shadow-2xl)',
  },
  loginHeader: {
    background: 'var(--color-brand-primary)',
    padding: 'var(--space-8)',
    textAlign: 'center',
    color: 'var(--color-text-inverse)',
  },
  loginTitle: {
    marginBottom: 'var(--space-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    fontSize: 'var(--text-3xl)',
    fontWeight: 'var(--font-bold)',
    fontFamily: 'var(--font-secondary)',
  },
  loginSubtitle: {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-primary-100)',
  },
  loginBody: {
    padding: 'var(--space-8)',
  },
  errorMessage: {
    marginBottom: 'var(--space-6)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--space-3)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-danger-border)',
    backgroundColor: 'var(--color-danger-light)',
    padding: 'var(--space-4)',
    color: 'var(--color-danger-dark)',
  },
  errorIcon: {
    marginTop: 'var(--space-1)',
    color: 'var(--color-danger)',
  },
  errorText: {
    fontSize: 'var(--text-sm)',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-6)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  formLabel: {
    marginBottom: 'var(--space-2)',
    display: 'block',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-medium)',
    color: 'var(--color-text-primary)',
  },
  labelIcon: {
    marginRight: 'var(--space-2)',
    color: 'var(--color-text-secondary)',
  },
  inputWrapper: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 'var(--space-3)',
    pointerEvents: 'none',
    color: 'var(--color-text-muted)',
  },
  formInput: {
    width: '100%',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border-default)',
    padding: 'var(--space-3) var(--space-4) var(--space-3) 2.5rem',
    fontSize: 'var(--text-base)',
    fontFamily: 'var(--font-primary)',
    color: 'var(--color-text-primary)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'var(--transition-base)',
  },
  formInputPassword: {
    width: '100%',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border-default)',
    padding: 'var(--space-3) 3rem var(--space-3) 2.5rem',
    fontSize: 'var(--text-base)',
    fontFamily: 'var(--font-primary)',
    color: 'var(--color-text-primary)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'var(--transition-base)',
  },
  passwordToggle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    paddingRight: 'var(--space-3)',
    color: 'var(--color-text-muted)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'var(--transition-color)',
  },
  loginSubmitButton: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-brand-primary)',
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-semibold)',
    fontFamily: 'var(--font-primary)',
    color: 'var(--color-text-inverse)',
    border: 'none',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-lg)',
    transition: 'var(--transition-base)',
  },
  loginFooter: {
    marginTop: 'var(--space-6)',
    textAlign: 'center',
  },
  adminLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
    transition: 'var(--transition-color)',
  },
};

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
    if (formData.username.trim() === 'su' && formData.password === 'su') {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginWrapper}>
        {/* Login Container */}
        <div style={styles.loginCard}>
          {/* Header */}
          <div style={styles.loginHeader}>
            <h1 style={styles.loginTitle}>
              <i className="fas fa-file-invoice-dollar"></i>
              <span>InvoicePro</span>
            </h1>
            <p style={styles.loginSubtitle}>Access your billing dashboard</p>
          </div>

          {/* Body */}
          <div style={styles.loginBody}>
            {/* Error Message */}
            {error && (
              <div style={styles.errorMessage}>
                <i className="fas fa-exclamation-circle" style={styles.errorIcon}></i>
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={styles.loginForm}>
              {/* Username Field */}
              <div style={styles.formGroup}>
                <label htmlFor="id_username" style={styles.formLabel}>
                  <i className="fas fa-user" style={styles.labelIcon}></i>
                  Username
                </label>
                <div style={styles.inputWrapper}>
                  <div style={styles.inputIcon}>
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="id_username"
                    style={styles.formInput}
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={styles.formGroup}>
                <label htmlFor="id_password" style={styles.formLabel}>
                  <i className="fas fa-key" style={styles.labelIcon}></i>
                  Password
                </label>
                <div style={styles.inputWrapper}>
                  <div style={styles.inputIcon}>
                    <i className="fas fa-key"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="id_password"
                    style={styles.formInputPassword}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={styles.passwordToggle}
                    aria-label="Toggle password visibility"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" style={styles.loginSubmitButton}>
                <i className="fas fa-sign-in-alt"></i>
                <span>Sign In</span>
              </button>
            </form>

            {/* Footer */}
            <div style={styles.loginFooter}>
              <a href="/admin/" style={styles.adminLink}>
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