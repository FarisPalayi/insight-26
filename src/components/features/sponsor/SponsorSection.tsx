import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Award, Trophy, Star, Crown } from "lucide-react";
import { type SponsorTier } from "@/types";
import { SponsorCard } from "./SponsorCard";
import { TitleSponsorCard } from "./TitleSponsorCard";
import { fetchSponsorTiers } from "@/services/sponsorService";

// Map icon names to actual icon components
const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-4 h-4" />,
  zap: <Zap className="w-4 h-4" />,
  award: <Award className="w-4 h-4" />,
  trophy: <Trophy className="w-4 h-4" />,
  star: <Star className="w-4 h-4" />,
  crown: <Crown className="w-4 h-4" />
};

const SponsorsSection = () => {
  const [sponsorTiers, setSponsorTiers] = useState<SponsorTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const tiers = await fetchSponsorTiers();
        // Map icon strings to actual components
        const tiersWithIcons = tiers.map(tier => ({
          ...tier,
          icon: typeof tier.icon === 'string' ? iconMap[tier.icon.toLowerCase()] || iconMap.star : tier.icon
        }));
        setSponsorTiers(tiersWithIcons);
      } catch (error) {
        console.error("Failed to load sponsors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSponsors();
  }, []);

  // Don't render section if no sponsors or still loading
  if (loading || sponsorTiers.length === 0 || !sponsorTiers.some(tier => tier.sponsors.length > 0)) {
    return null;
  }

  const titleSponsor = sponsorTiers[0]?.sponsors[0];
  const hasTitleSponsor = titleSponsor && titleSponsor.name !== "Your Brand Here";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="sponsors" className="relative py-16 md:py-20 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-10"
        >
          {/* Section header - more compact */}
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              Backed by <span className="text-gradient">Industry Leaders</span>
            </h2>
          </motion.div>

          {/* Title Sponsor - Compact placement */}
          {hasTitleSponsor && (
            <motion.div variants={itemVariants} className="max-w-lg mx-auto">
              <TitleSponsorCard
                sponsor={titleSponsor}
                accentColor={sponsorTiers[0].accentColor}
              />
            </motion.div>
          )}

          {/* Other Sponsor Tiers */}
          <div className="space-y-8">
            {sponsorTiers.slice(hasTitleSponsor ? 1 : 0).map((tier, tierIndex) => {
              if (tier.sponsors.length === 0) return null;
              
              return (
                <motion.div key={tier.id || tier.name} variants={itemVariants} className="space-y-4">
                  {/* Tier header - more compact */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-border" />
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <span className={`p-1 rounded-md bg-gradient-to-r ${tier.accentColor} text-background`}>
                        {tier.icon}
                      </span>
                      <span>{tier.name}</span>
                    </div>
                    <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-border" />
                  </div>

                  {/* Sponsor grid - responsive based on number of sponsors */}
                  <div className={`grid gap-3 ${
                    tier.sponsors.length === 1
                      ? "grid-cols-1 max-w-xs mx-auto"
                      : tier.sponsors.length === 2
                      ? "grid-cols-1 sm:grid-cols-2 max-w-md mx-auto"
                      : tier.sponsors.length === 3
                      ? "grid-cols-2 sm:grid-cols-3 max-w-lg mx-auto"
                      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-3xl mx-auto"
                  }`}>
                    {tier.sponsors.map((sponsor, index) => (
                      <SponsorCard
                        key={index}
                        sponsor={sponsor}
                        accentColor={tier.accentColor}
                        size={tierIndex === 0 && tier.sponsors.length <= 2 ? "default" : "small"}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;