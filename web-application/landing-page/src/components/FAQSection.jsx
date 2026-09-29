import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQSection.css';

const faqs = [
  {
    id: 1,
    question: 'How do GYMEZY pay-per-session daily gym passes work?',
    answer:
      'With GYMEZY, you can browse verified gyms in your neighborhood, view amenities and photos, and book a single-day drop-in pass instantly. Upon booking, you receive a dynamic OTP/QR digital pass on your phone for seamless, queue-free check-in at the gym front desk.'
  },
  {
    id: 2,
    question: 'Are there any annual lock-in contracts or joining fees?',
    answer:
      'No. GYMEZY is designed for 100% fitness freedom. There are no mandatory annual commitments, security deposits, or surprise maintenance fees. You only pay for the individual workouts or multi-month memberships you choose.'
  },
  {
    id: 3,
    question: 'Can I book certified 1-on-1 personal trainers through GYMEZY?',
    answer:
      'Yes. You can explore verified personal coaches specializing in strength & conditioning, fat loss, functional training, and competitive bodybuilding. View their certifications, reviews, and rates, and book direct 1-on-1 training slots.'
  },
  {
    id: 4,
    question: 'How do fitness center and gym owners partner with GYMEZY?',
    answer:
      'Gym and studio owners can list their facilities for free on GYMEZY, monetize unutilized floor hours, receive verified walk-in athlete revenue, and manage members using our intuitive digital pass verification scanner.'
  },
  {
    id: 5,
    question: 'Which cities and locations is GYMEZY currently available in?',
    answer:
      'GYMEZY is currently focused on premier fitness centers across Chennai, Tamil Nadu (including Moulivakkam, Porur, Anna Nagar, T. Nagar, OMR, Velachery, and surrounding areas), with partner gym networks actively onboarding city-wide.'
  },
  {
    id: 6,
    question: 'Is the GYMEZY mobile app available on Android and Web?',
    answer:
      'Yes! The GYMEZY mobile app is available on Android (Google Play Store) and Mobile Web, providing instant pass bookings, workout logging, trainer scheduling, and contactless QR entry.'
  }
];

export default function FAQSection({ id = 'faq' }) {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (faqId) => {
    setOpenId((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <section className="gymezy-faq-section" id={id}>
      <div className="section-container">
        <div className="faq-header-wrapper">
          <span className="section-category-pill">Got Questions?</span>
          <h2 className="faq-heading-lg">
            Frequently Asked <span className="title-italic-accent">Questions</span>
          </h2>
          <p className="faq-sub-desc">
            Everything you need to know about GYMEZY daily gym passes, multi-gym memberships, and personal coaching.
          </p>
        </div>

        <div className="faq-accordion-grid">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-card-item ${isOpen ? 'active-open' : ''}`}
                onClick={() => toggleFAQ(faq.id)}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFAQ(faq.id);
                  }}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className={`faq-icon-indicator ${isOpen ? 'rotated' : ''}`}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`faq-ans-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="faq-answer-collapse"
                    >
                      <div className="faq-answer-inner">
                        <p className="faq-answer-text">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
