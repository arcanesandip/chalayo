import './Features.css';

const features = [
  {
    title: 'Smart Invoicing',
    description:
      'Create beautiful, professional invoices in seconds with our AI-powered templates.',
    iconColor: 'icon-blue',
    bgColor: 'preview-blue',
    previewText: '📄 Invoice Preview',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
  },
  {
    title: 'Expense Tracking',
    description:
      'Automatically categorize expenses and get real-time insights into your spending.',
    iconColor: 'icon-green',
    bgColor: 'preview-green',
    previewText: '💰 Expense Analytics',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    title: 'Financial Reports',
    description:
      'Generate comprehensive reports with beautiful visualizations and insights.',
    iconColor: 'icon-purple',
    bgColor: 'preview-purple',
    previewText: '📊 Report Dashboard',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <span className="features-badge">POWERFUL FEATURES</span>
          <h2 className="features-title">Everything you need in one place</h2>
          <p className="features-description">
            A comprehensive suite of tools designed to simplify your financial
            management.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className={`feature-icon ${f.iconColor}`}>
                <svg
                  className="icon-svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {f.icon}
                </svg>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-description">{f.description}</p>
              <div className={`feature-preview ${f.bgColor}`}>
                <div className="preview-text">{f.previewText}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
