import { motion } from "framer-motion";
import { HelpCircle, Mail, Phone, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How do I register for Insight'26?",
    answer:
      "Register through our official website by filling out the registration form with your details. Spot registration is also available at the venue on event days.",
  },
  {
    question: "Who can participate in Insight'26?",
    answer:
      "Any undergraduate or postgraduate student from recognized colleges can participate. Some events may have specific eligibility criteria mentioned in their descriptions.",
  },
  {
    question: "Is there accommodation for outstation students?",
    answer:
      "Yes, limited accommodation is available on request. Contact our team at least 3 days before the event to arrange your stay at nominal charges.",
  },
  {
    question: "What about prizes and certificates?",
    answer:
      "All participants receive participation certificates. Winners get cash prizes, trophies, and winner certificates. Prize amounts vary by event category.",
  },
  {
    question: "Can events be cancelled?",
    answer:
      "Events require minimum participants to proceed. If an event doesn't meet the threshold, participants will be notified and can switch to other events.",
  },
  {
    question: "Will food be provided during the fest?",
    answer:
      "Food stalls and refreshment counters will be available throughout the venue. Lunch coupons are included for registered participants.",
  },
  {
    question: "Can I participate in multiple events?",
    answer:
      "Yes! You can register for multiple events as long as their timings don't clash. Check the schedule to plan your participation.",
  },
  {
    question: "Have more questions?",
    answer:
      "Our team is here to help! Reach out via email at insightcuc@gmail.com or call our coordinators. We typically respond within 24 hours.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

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

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-surface rounded-xl border-0 px-5 md:px-6 overflow-hidden group data-[state=open]:border-primary/20 transition-colors duration-300"
                >
                  <AccordionTrigger className="py-5 text-left text-base md:text-lg font-medium text-foreground hover:no-underline hover:text-primary transition-colors duration-200 [&[data-state=open]]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-surface-strong rounded-2xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Still have questions?
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Our team typically responds within 24 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="btn-outline-glow gap-2 text-foreground"
                  asChild
                >
                  <a href="mailto:insightcuc@gmail.com">
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                </Button>
                <Button
                  className="btn-glow bg-primary text-primary-foreground gap-2"
                  asChild
                >
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick contact info */}
            <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap gap-4 md:gap-8 text-sm text-muted-foreground">
              <a
                href="mailto:insightcuc@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                insightcuc@gmail.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
