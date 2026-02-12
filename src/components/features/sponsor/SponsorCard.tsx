import { motion } from "framer-motion";
import { type Sponsor } from "@/types";
import { Building2 } from "lucide-react";

export const SponsorCard = ({ 
  sponsor, 
  accentColor, 
  size = "default" 
}: { 
  sponsor: Sponsor; 
  accentColor: string; 
  size?: "default" | "small" 
}) => {
  const hasLogo = sponsor.logo && sponsor.logo !== "";
  
  return (
    <motion.a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient border on hover */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${accentColor} rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />

      <div className={`relative glass-surface rounded-lg ${size === "small" ? "p-3" : "p-4"} flex items-center justify-center h-full`}>
        <div className={`flex items-center justify-center w-full ${size === "small" ? "h-12" : "h-16"}`}>
          {hasLogo ? (
            // Display actual logo from Cloudinary
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
            />
          ) : (
            // Placeholder for sponsors without logos
            <div className="flex flex-col items-center justify-center gap-1 border border-dashed border-white/10 rounded-md px-3 py-2 w-full h-full group-hover:border-white/20 transition-colors">
              <Building2 className={`${size === "small" ? "w-4 h-4" : "w-5 h-5"} text-muted-foreground/40`} />
              <span className={`${size === "small" ? "text-[10px]" : "text-xs"} text-muted-foreground/60 font-medium text-center leading-tight`}>
                {sponsor.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
};