const features = [
  {
    title: 'Smart Invoicing',
    description:
      'Create beautiful, professional invoices in seconds with our AI-powered templates.',
    iconColor: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
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
    iconColor: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100',
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
    iconColor: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
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
    <section id="features" className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            POWERFUL FEATURES
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need in one place
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            A comprehensive suite of tools designed to simplify your financial
            management.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="card-hover rounded-3xl border border-gray-100 bg-white p-8"
            >
              <div
                className={`h-14 w-14 rounded-2xl bg-linear-to-br ${f.iconColor} mb-6 flex items-center justify-center`}
              >
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {f.icon}
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                {f.title}
              </h3>
              <p className="mb-6 text-gray-600">{f.description}</p>
              <div
                className={`h-40 bg-linear-to-br ${f.bgColor} mb-6 flex items-center justify-center rounded-2xl`}
              >
                <div className="font-medium text-blue-600">{f.previewText}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
