import { motion } from "framer-motion";
import { type Sponsor } from "@/types";
import { Building2 } from "lucide-react";

export
  const TitleSponsorCard = ({ sponsor, accentColor }: { sponsor: Sponsor; accentColor: string }) => (
    <motion.a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >

      {/* Main card */}
      <div className="relative glass-surface-strong rounded-2xl p-8 md:p-12">
        {/* Corner accents */}
        <div className={`absolute top-0 left-0 w-16 h-16 bg-gradient-to-br ${accentColor} opacity-20 rounded-tl-2xl`} />
        <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${accentColor} opacity-20 rounded-br-2xl`} />

        <div className="flex flex-col items-center text-center space-y-4">
          <span className={`text-xs font-mono uppercase tracking-[0.3em] bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
            Presenting Partner
          </span>

          {/* Logo placeholder - designed to look intentional */}
          <div className="relative py-8">
            <div className={`absolute inset-0 bg-gradient-to-r ${accentColor} opacity-10 blur-3xl`} />
            <div className="relative flex items-center justify-center w-64 h-24 border border-dashed border-white/20 rounded-xl">
              <div className="text-center">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">{sponsor.name}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-md">
            Lead the future of tech innovation. Become the face of Kerala's largest student-led tech festival.
          </p>
        </div>
      </div>
    </motion.a>
  );

