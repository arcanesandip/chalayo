import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-text">
              ✨ Trusted by 10,000+ businesses worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            Finance management
            <span className="hero-title-gradient">reimagined</span>
          </h1>

          {/* Subheading */}
          <p className="hero-subtitle">
            Create professional invoices, track expenses, and keep your finances
            organized—all in one simple, elegant platform.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button className="hero-button-primary">
              <span>Get Started Free</span>
              <svg
                className="button-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </button>
            <button className="hero-button-secondary">
              <i className="fa-solid fa-circle-play button-icon-secondary"></i>
              Watch Demo
            </button>
          </div>

          {/* The Complete Mock Dashboard */}
          <div className="dashboard-preview">
            {/* Mock Browser Bar */}
            <div className="browser-bar">
              <div className="browser-controls">
                <div className="browser-dot browser-dot-red"></div>
                <div className="browser-dot browser-dot-yellow"></div>
                <div className="browser-dot browser-dot-green"></div>
              </div>
              <div className="browser-address-bar">
                <div className="address-bar-content">dashboard.chalayo.com</div>
              </div>
              <div className="browser-spacer"></div>
            </div>

            {/* Mock Dashboard Content */}
            <div className="dashboard-content">
              <div className="dashboard-cards">
                {/* Revenue Card */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <span className="card-title">Total Revenue</span>
                    <div className="card-icon card-icon-blue">
                      <i className="fa-solid fa-dollar-sign"></i>
                    </div>
                  </div>
                  <div className="card-value">$45,231</div>
                  <div className="card-metric card-metric-positive">
                    ↑ 12.5% from last month
                  </div>
                </div>

                {/* Expenses Card */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <span className="card-title">Monthly Expenses</span>
                    <div className="card-icon card-icon-green">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                  </div>
                  <div className="card-value">$12,340</div>
                  <div className="card-metric card-metric-positive">
                    ↓ 8.2% from last month
                  </div>
                </div>

                {/* Invoices Card */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <span className="card-title">Pending Invoices</span>
                    <div className="card-icon card-icon-purple">
                      <i className="fa-solid fa-file-invoice"></i>
                    </div>
                  </div>
                  <div className="card-value">12</div>
                  <div className="card-metric card-metric-info">
                    $8,450 total pending
                  </div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="dashboard-chart">
                <div className="chart-header">
                  <h3 className="chart-title">Revenue Trend</h3>
                  <span className="chart-period">Last 6 months</span>
                </div>
                <div className="chart-placeholder">
                  <div className="chart-placeholder-content">
                    <i className="fa-solid fa-chart-area"></i>
                    Interactive Chart Visualization
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
