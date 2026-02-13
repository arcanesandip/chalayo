export default function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-20 text-center lg:py-32">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Start managing smarter today
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-300">
            Join 10,000+ businesses who trust CHALAYO.
          </p>
          <button className="rounded-xl bg-linear-to-r from-blue-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-2xl">
            Start Free Trial
          </button>
          <p className="mt-6 text-sm text-gray-400">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-12">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 text-gray-400 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600" />
              <span className="text-xl font-semibold text-white">CHALAYO</span>
            </div>
            <p className="text-sm">
              The modern finance platform for businesses and individuals.
              Simple, powerful, and elegant.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>API</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>GDPR</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-12 border-t border-gray-800 px-4 pt-8 text-center text-sm text-gray-500">
          © 2026 CHALAYO. All rights reserved.
        </div>
      </footer>
    </>
  );
}
