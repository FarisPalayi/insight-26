import { motion } from "framer-motion";
import { ContactCard } from "./ContactCard";
import { FAQAccordion } from "./FAQAccordion";
import { faqs } from "./faqData";

const FAQSection = () => {
  return (
    <section id="faq" className="relative pt-24 md:pt-32 lg:pt-40 overflow-hidden">
      {/* Background accents */}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>
          <FAQAccordion faqs={faqs} />
          <ContactCard />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
