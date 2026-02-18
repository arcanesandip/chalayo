import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <div className="navbar-logo">
              <div className="logo-icon">
                <span className="logo-text">C</span>
              </div>
              <span className="logo-brand">CHALAYO</span>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-menu">
              <a href="#features" className="nav-link">
                Features
              </a>
              <a href="#solutions" className="nav-link">
                Solutions
              </a>
              <a href="#pricing" className="nav-link">
                Pricing
              </a>
              <a href="#resources" className="nav-link">
                Resources
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="navbar-actions">
              <Button to="/login" className="nav-signin">
                Sign In
              </Button>
              <a href="#start-free" className="nav-cta">
                Start Free Trial
              </a>

              {/* Mobile Menu Button */}
              <button onClick={toggleMenu} className="mobile-menu-button">
                {isOpen ? (
                  <svg
                    className="menu-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="menu-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}>
        {/* Backdrop */}
        <div className="mobile-menu-backdrop" onClick={toggleMenu}></div>

        {/* Menu Panel */}
        <div className={`mobile-menu-panel ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <div className="mobile-logo">
                <div className="logo-icon">
                  <span className="logo-text">C</span>
                </div>
                <span className="logo-brand">CHALAYO</span>
              </div>
              <button onClick={toggleMenu} className="mobile-close-button">
                <svg
                  className="menu-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mobile-menu-links">
              <a
                href="#features"
                onClick={toggleMenu}
                className="mobile-nav-link"
              >
                Features
              </a>
              <a
                href="#solutions"
                onClick={toggleMenu}
                className="mobile-nav-link"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                onClick={toggleMenu}
                className="mobile-nav-link"
              >
                Pricing
              </a>
              <a
                href="#resources"
                onClick={toggleMenu}
                className="mobile-nav-link"
              >
                Resources
              </a>

              <div className="mobile-menu-actions">
                <Button to="/login" className="mobile-signin-button">
                  Sign In
                </Button>
                <a href="#start-free" className="mobile-trial-button">
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
