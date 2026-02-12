import { motion } from "framer-motion"
import { GraduationCap, MapPin, Trophy, ExternalLink } from "lucide-react";
import { type FooterLink } from "@/types";

const resourceLinks: FooterLink[] = [
  {
    label: "Calicut University",
    href: "https://www.uoc.ac.in",
    icon: <GraduationCap className="w-4 h-4" />,
    external: true
  },
  {
    label: "CCSIT Official",
    href: "https://ccsit.uoc.ac.in",
    icon: <GraduationCap className="w-4 h-4" />,
    external: true
  },
  {
    label: "Event Locations",
    href: "/venues",
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    label: "Past Winners",
    href: "#winners",
    icon: <Trophy className="w-4 h-4" />
  },
];

export const FooterResources = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
        Resources
      </h4>
      <ul className="space-y-3">
        {resourceLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group"
            >
              <span className="text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                {link.icon}
              </span>
              {link.label}
              {link.external && (
                <ExternalLink className="w-3 h-3 opacity-50" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
