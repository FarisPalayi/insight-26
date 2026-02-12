import { motion } from "framer-motion";
import { type Sponsor } from "@/types";
import { Building2 } from "lucide-react";

export const TitleSponsorCard = ({ 
  sponsor, 
  accentColor 
}: { 
  sponsor: Sponsor; 
  accentColor: string 
}) => {
  const hasLogo = sponsor.logo && sponsor.logo !== "";
  
  return (
    <motion.a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main card - more compact */}
      <div className="relative glass-surface-strong rounded-xl p-6 md:p-8">
        <div className="flex flex-col items-center text-center space-y-3">
          <span className={`text-[10px] font-mono uppercase tracking-[0.3em] bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
            Presenting Partner
          </span>

          {/* Logo display */}
          <div className="relative py-4 w-full">
            <div className={`absolute inset-0 bg-gradient-to-r ${accentColor} opacity-10 blur-3xl`} />
            <div className="relative flex items-center justify-center">
              {hasLogo ? (
                // Display actual logo from Cloudinary
                <div className="w-full max-w-[280px] h-20 flex items-center justify-center">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ) : (
                // Placeholder
                <div className="flex items-center justify-center w-full max-w-[280px] h-20 border border-dashed border-white/20 rounded-lg">
                  <div className="text-center">
                    <Building2 className="w-6 h-6 mx-auto mb-1.5 text-muted-foreground/50" />
                    <span className="text-sm text-muted-foreground font-medium">{sponsor.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground/80 max-w-sm leading-relaxed">
            Lead the future of tech innovation. Become the face of Kerala's largest student-led tech festival.
          </p>
        </div>
      </div>
    </motion.a>
  );
};