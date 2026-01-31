import { motion } from "framer-motion"
import { BookOpen, Calendar } from "lucide-react";
import { type FooterLink } from "@/types";

const quickLinks: FooterLink[] = [
  { label: "Events", href: "events", icon: <Calendar className="w-4 h-4" /> },
  { label: "Schedule", href: "schedule", icon: <Calendar className="w-4 h-4" /> },
  { label: "Brochure", href: "brochure", icon: <BookOpen className="w-4 h-4" /> },
];

export const FooterQuickLinks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
        Quick Links
      </h4>
      <ul className="space-y-3">
        {quickLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group"
            >
              <span className="text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                {link.icon}
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
