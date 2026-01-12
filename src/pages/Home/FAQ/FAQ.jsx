import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQ = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const faqs = [
    {
      q: "How do I withdraw my prize money?",
      a: "Once a creator declares you a winner, the prize amount is added to your wallet. You can withdraw via Stripe or PayPal within 24 hours.",
    },
    {
      q: "Is there a limit to how many contests I can join?",
      a: "No! Normal users can participate in as many contests as they like, provided they pay the individual entry fees.",
    },
    {
      q: "How does the Admin verify contests?",
      a: "Our Admin team reviews every contest for prize legitimacy and clear rules before they go live to ensure user safety.",
    },
  ];

  return (
    <section className="py-20 bg-base-100 text-base-content transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 data-aos="zoom-in" className="text-4xl font-bold text-center mb-12">
          Got <span className="text-primary">Questions?</span>
        </h2>

        <div className="join join-vertical w-full border border-base-300">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="collapse collapse-arrow join-item border-b border-base-300"
            >
              <input
                type="radio"
                name="my-accordion-4"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-xl font-medium">{faq.q}</div>
              <div className="collapse-content text-base-content/70">
                <p>{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
