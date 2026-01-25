import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { ContactCard } from "./ContactCard";
import { FAQAccordion } from "./FAQAccordion";
import { faqs } from "./faqData";

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-20 md:py-32 overflow-hidden">
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border text-sm text-muted-foreground font-mono">
              <HelpCircle className="w-4 h-4" />
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
              Everything you need to know about Insight'26. Can't find your
              answer? Reach out to our team.
            </p>
          </motion.div>
          <FAQAccordion faqs={faqs} />
          <ContactCard />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
