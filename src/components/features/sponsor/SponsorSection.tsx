import { motion } from "framer-motion";
import { Sparkles, Zap, Award } from "lucide-react";
import { type SponsorTier } from "@/types";
import { SponsorCard } from "./SponsorCard";
import { TitleSponsorCard } from "./TitleSponsorCard";

const sponsorTiers: SponsorTier[] = [
  {
    name: "Title Sponsor",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Presenting Partner",
    accentColor: "from-amber-400 via-yellow-300 to-amber-500",
    sponsors: [
      { name: "Your Brand Here", website: "#" }
    ]
  },
  {
    name: "Platinum Partners",
    icon: <Zap className="w-4 h-4" />,
    description: "Premium Visibility",
    accentColor: "from-slate-300 via-white to-slate-400",
    sponsors: [
      { name: "Partner 1", website: "#" },
      { name: "Partner 2", website: "#" }
    ]
  },
  {
    name: "Gold Partners",
    icon: <Award className="w-4 h-4" />,
    description: "Event Supporters",
    accentColor: "from-amber-600 via-amber-500 to-yellow-600",
    sponsors: [
      { name: "Sponsor A", website: "#" },
      { name: "Sponsor B", website: "#" },
      { name: "Sponsor C", website: "#" }
    ]
  }
];

const SponsorsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="sponsors" className="relative pt-20 md:pt-32 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border text-sm text-muted-foreground font-mono">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Partners & Sponsors
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Backed by <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Join the brands shaping the future of technology and education in Kerala
            </p>
          </motion.div>

          {/* Title Sponsor - Prominent placement */}
          <motion.div variants={itemVariants} className="max-w-xl mx-auto">
            <TitleSponsorCard
              sponsor={sponsorTiers[0].sponsors[0]}
              accentColor={sponsorTiers[0].accentColor}
            />
          </motion.div>

          {/* Platinum & Gold Sponsors */}
          <div className="space-y-12">
            {sponsorTiers.slice(1).map((tier, tierIndex) => (
              <motion.div key={tier.name} variants={itemVariants} className="space-y-6">
                {/* Tier header */}
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span className={`p-1.5 rounded-md bg-gradient-to-r ${tier.accentColor} text-background`}>
                      {tier.icon}
                    </span>
                    <span>{tier.name}</span>
                  </div>
                  <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
                </div>

                {/* Sponsor grid */}
                <div className={`grid gap-4 ${tierIndex === 0
                  ? "grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto"
                  : "grid-cols-2 sm:grid-cols-3 max-w-2xl mx-auto"
                  }`}>
                  {tier.sponsors.map((sponsor, index) => (
                    <SponsorCard
                      key={index}
                      sponsor={sponsor}
                      accentColor={tier.accentColor}
                      size={tierIndex === 0 ? "default" : "small"}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
