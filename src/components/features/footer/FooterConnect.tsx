import { type SocialLink } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Instagram, Linkedin, Mail, Youtube } from "lucide-react";

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "#",
    icon: <Linkedin className="w-5 h-5" />,
    hoverColor: "hover:bg-[#0077B5]/20 hover:text-[#0077B5]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_insight.26_/",
    icon: <Instagram className="w-5 h-5" />,
    hoverColor: "hover:bg-[#E4405F]/20 hover:text-[#E4405F]",
  },
  {
    name: "YouTube",
    href: "#",
    icon: <Youtube className="w-5 h-5" />,
    hoverColor: "hover:bg-[#FF0000]/20 hover:text-[#FF0000]",
  },
  {
    name: "Linktree",
    href: "#",
    icon: <ExternalLink className="w-5 h-5" />,
    hoverColor: "hover:bg-[#43E660]/20 hover:text-[#43E660]",
  },
];


export const FooterConnect = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
        Connect With Us
      </h4>
      <div className="flex flex-wrap gap-2 mb-6">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`p-2.5 rounded-lg bg-muted/30 text-muted-foreground transition-all duration-200 ${social.hoverColor}`}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <a
        href="mailto:insightcuc@gmail.com"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Mail className="w-4 h-4" />
        insightcuc@gmail.com
      </a>
    </motion.div>

  )
}
