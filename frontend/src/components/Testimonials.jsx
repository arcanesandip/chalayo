const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow Inc.',
    initial: 'S',
    gradient: 'from-blue-400 to-purple-500',
    text: 'CHALAYO transformed how we manage our finances. The interface is beautiful and the features are incredibly powerful.',
  },
  {
    name: 'Marcus Rivera',
    role: 'Freelance Designer',
    initial: 'M',
    gradient: 'from-green-400 to-blue-500',
    text: 'As a freelancer, CHALAYO saves me hours every week. The invoice automation alone is worth the price.',
  },
  {
    name: 'Jessica Park',
    role: 'Small Business Owner',
    initial: 'J',
    gradient: 'from-purple-400 to-pink-500',
    text: 'The mobile app is perfect for managing finances on the go. CHALAYO makes financial management effortless.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-linear-to-b from-white to-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            TESTIMONIALS
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Loved by businesses worldwide
          </h2>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex items-center">
                <div
                  className={`h-12 w-12 rounded-full bg-linear-to-br ${t.gradient} mr-4 flex items-center justify-center font-bold text-white`}
                >
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t.text}"</p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
