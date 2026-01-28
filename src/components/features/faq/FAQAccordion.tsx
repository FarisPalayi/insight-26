import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/types";

type FAQAccordionProps = {
  faqs: FAQ[]
}

export const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  return (
    < motion.div
      initial={{ opacity: 0, y: 20 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <Accordion
        type="single"
        collapsible
        className="space-y-1"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="glass-surface rounded-md rounded-md md:rounded-lg border-0 px-5 md:px-6 overflow-hidden"
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
    </motion.div >
  )
}
