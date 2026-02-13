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
    <section id="pricing" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600">
            Choose the plan that's right for your business growth.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-3xl border p-8 ${
                plan.highlighted
                  ? 'relative scale-105 border-blue-500 bg-white shadow-xl'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </span>
              )}
              <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <svg
                      className="mr-2 h-5 w-5 text-green-500"
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
                className={`w-full rounded-xl py-3 font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
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
