import './Footer.css';

export default function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-heading">Start managing smarter today</h2>
          <p className="cta-description">
            Join 10,000+ businesses who trust CHALAYO.
          </p>
          <button className="cta-button">Start Free Trial</button>
          <p className="cta-disclaimer">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-header">
              <div className="brand-logo" />
              <span className="brand-name">CHALAYO</span>
            </div>
            <p className="brand-description">
              The modern finance platform for businesses and individuals.
              Simple, powerful, and elegant.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Product</h3>
            <ul className="footer-links">
              <li>Features</li>
              <li>Pricing</li>
              <li>API</li>
              <li>Documentation</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>GDPR</li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright">
          © 2026 CHALAYO. All rights reserved.
        </div>
      </footer>
    </>
  );
}
