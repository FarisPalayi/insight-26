import { motion } from "framer-motion";
import { type Sponsor } from "@/types";

export const SponsorCard = ({ sponsor, accentColor, size = "default" }: { sponsor: Sponsor; accentColor: string; size?: "default" | "small" }) => (
  <motion.a
    href={sponsor.website}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block"
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    {/* Gradient border on hover */}
    <div className={`absolute -inset-[1px] bg-gradient-to-r ${accentColor} rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />

    <div className={`relative glass-surface rounded-xl ${size === "small" ? "p-4" : "p-6"} flex items-center justify-center`}>
      {/* Logo placeholder */}
      <div className={`flex items-center justify-center ${size === "small" ? "w-full h-14" : "w-full h-20"} border border-dashed border-white/10 rounded-lg group-hover:border-white/20 transition-colors`}>
        <div className="text-center">
          <span className={`${size === "small" ? "text-xs" : "text-sm"} text-muted-foreground font-medium group-hover:text-foreground/80 transition-colors`}>
            {sponsor.name}
          </span>
        </div>
      </div>
    </div>
  </motion.a>
);


