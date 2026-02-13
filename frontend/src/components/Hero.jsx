export default function Hero() {
  return (
    <section className="hero-gradient overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-blue-50 px-4 py-2">
            <span className="text-sm font-medium text-blue-600">
              ✨ Trusted by 10,000+ businesses worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            Finance management
            <span className="text-gradient block">reimagined</span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 max-w-3xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
            Create professional invoices, track expenses, and keep your finances
            organized—all in one simple, elegant platform.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex transform items-center justify-center rounded-xl bg-linear-to-r from-blue-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <span>Get Started Free</span>
              <svg
                className="ml-2 h-5 w-5"
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

            <button className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 px-8 py-4 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50">
              {/* Restored Font Awesome Icon */}
              <i className="fa-solid fa-circle-play mr-2 text-xl"></i>
              Watch Demo
            </button>
          </div>

          {/* The Complete Mock Dashboard */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-linear-to-b from-gray-900 to-gray-800 shadow-2xl">
            {/* Mock Browser Bar */}
            <div className="flex items-center justify-between bg-gray-900 p-4">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-4 flex-1">
                <div className="rounded-lg bg-gray-800 px-4 py-1 text-center text-sm text-gray-400">
                  dashboard.chalayo.com
                </div>
              </div>
              <div className="w-10"></div>
            </div>

            {/* Mock Dashboard Content */}
            <div className="bg-linear-to-br from-white to-gray-50 p-8 text-left">
              <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Revenue Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-medium text-gray-600">
                      Total Revenue
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                      <i className="fa-solid fa-dollar-sign"></i>
                    </div>
                  </div>
                  <div className="mb-2 text-3xl font-bold text-gray-900">
                    $45,231
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    ↑ 12.5% from last month
                  </div>
                </div>

                {/* Expenses Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-medium text-gray-600">
                      Monthly Expenses
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-500">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                  </div>
                  <div className="mb-2 text-3xl font-bold text-gray-900">
                    $12,340
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    ↓ 8.2% from last month
                  </div>
                </div>

                {/* Invoices Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-medium text-gray-600">
                      Pending Invoices
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                      <i className="fa-solid fa-file-invoice"></i>
                    </div>
                  </div>
                  <div className="mb-2 text-3xl font-bold text-gray-900">
                    12
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    $8,450 total pending
                  </div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Revenue Trend
                  </h3>
                  <span className="text-sm text-gray-500">Last 6 months</span>
                </div>
                <div className="flex h-48 items-center justify-center rounded-xl bg-linear-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center gap-2 font-medium text-gray-400">
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
