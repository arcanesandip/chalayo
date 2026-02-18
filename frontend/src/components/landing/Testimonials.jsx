import './Testimonials.css';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow Inc.',
    initial: 'S',
    gradient: 'avatar-blue-purple',
    text: 'CHALAYO transformed how we manage our finances. The interface is beautiful and the features are incredibly powerful.',
  },
  {
    name: 'Marcus Rivera',
    role: 'Freelance Designer',
    initial: 'M',
    gradient: 'avatar-green-blue',
    text: 'As a freelancer, CHALAYO saves me hours every week. The invoice automation alone is worth the price.',
  },
  {
    name: 'Jessica Park',
    role: 'Small Business Owner',
    initial: 'J',
    gradient: 'avatar-purple-pink',
    text: 'The mobile app is perfect for managing finances on the go. CHALAYO makes financial management effortless.',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="testimonials-badge">TESTIMONIALS</span>
          <h2 className="testimonials-title">Loved by businesses worldwide</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-header">
                <div className={`testimonial-avatar ${t.gradient}`}>
                  {t.initial}
                </div>
                <div className="testimonial-author">
                  <h4 className="author-name">{t.name}</h4>
                  <p className="author-role">{t.role}</p>
                </div>
              </div>

              <p className="testimonial-text">"{t.text}"</p>

              <div className="testimonial-rating">
                {[...Array(5)].map((_, star) => (
                  <svg key={star} className="rating-star" viewBox="0 0 20 20">
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
