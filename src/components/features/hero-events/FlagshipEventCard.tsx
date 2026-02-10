import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { ArrowRight, Users, Zap } from "lucide-react";
import { Link } from "react-router";
import { type UnifiedEvent } from "@/lib/data/unifiedEvents";

interface FlagshipEventProps {
  event: UnifiedEvent;
  registrationStatus?: string;
}

export const FlagshipEvent = ({
  event,
  registrationStatus = "Registration started"
}: FlagshipEventProps) => {

  // Logic to handle fancy name or split name
  // If fancyName is provided, we use that; otherwise, we split the standard name
  const nameToDisplay = event.fancyName || event.name;
  const nameParts = nameToDisplay.split(/\s/);
  const firstName = nameParts[0];
  const secondName = nameParts.slice(1).join("");

  // Helper to format team size display
  const getTeamLabel = (size: UnifiedEvent['teamSize']) => {
    if (size === 'solo') return 'Solo Event';
    if (size === 'any') return 'Flexible Team';
    return `Team: ${size} Members`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-xl">
        {/* Decorative Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left content */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
                >
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {event.category === 'competition' ? 'Flagship Competition' : 'Featured Event'}
                  </span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                  <span className="text-foreground">{firstName}</span>
                  <span className="text-foreground text-foreground/60 ml-3 text-3xl md:text-4xl lg:text-5xl font-light italic">{secondName}</span>
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
              >
                {event.description}
              </motion.p>

              {/* Dynamic Stats based on Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 pt-2"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Day {event.schedule.day} • {event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {getTeamLabel(event.teamSize)}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right CTA area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col items-start lg:items-end gap-4"
            >
              <Button asChild>
                <Link to={`/events/${event.id}`}
                  className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 gap-3 text-lg px-8 py-6 group/btn"
                >
                  Explore Event
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground font-mono uppercase tracking-widest opacity-70">
                {registrationStatus}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
