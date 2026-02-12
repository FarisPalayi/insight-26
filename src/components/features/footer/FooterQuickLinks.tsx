import { motion } from "framer-motion"
import { BookOpen, Calendar, Mail } from "lucide-react";
import { type FooterLink } from "@/types";
import { Link } from "react-router";

const quickLinks: FooterLink[] = [
  { label: "Brochure", href: "https://raw.githubusercontent.com/FarisPalayi/insight-26/main/public/brochure.pdf", icon: <BookOpen className="w-4 h-4" />, external: true },
  { label: "Events", href: "events", icon: <Calendar className="w-4 h-4" /> },
  { label: "Schedule", href: "schedule", icon: <Calendar className="w-4 h-4" /> },
  { label: "Contact", href: "contact", icon: <Mail className="w-4 h-4" /> },
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
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                download
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group"
              >
                <span className="text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                  {link.icon}
                </span>
                {link.label}
              </a>
            ) : (
              <Link
                to={link.href}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group"
              >
                <span className="text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
