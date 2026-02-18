import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    price: '0',
    features: ['5 Invoices/mo', 'Basic Reports', 'Single User'],
    buttonText: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '29',
    features: [
      'Unlimited Invoices',
      'Advanced Analytics',
      '5 Team Members',
      'Custom Branding',
    ],
    buttonText: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '99',
    features: [
      'White-labeling',
      'API Access',
      'Dedicated Support',
      'Unlimited Everything',
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Simple, Transparent Pricing</h2>
          <p className="pricing-subtitle">
            Choose the plan that's right for your business growth.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card ${
                plan.highlighted ? 'pricing-card-highlighted' : ''
              }`}
            >
              {plan.highlighted && (
                <span className="pricing-badge">Most Popular</span>
              )}

              <h3 className="plan-name">{plan.name}</h3>

              <div className="plan-price">
                <span className="price-amount">${plan.price}</span>
                <span className="price-period">/month</span>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <svg
                      className="feature-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`plan-button ${
                  plan.highlighted
                    ? 'plan-button-primary'
                    : 'plan-button-secondary'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
