import { motion } from "framer-motion";
import { ArrowRight, Zap, Music, Mic2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "./EventCard";
import { FlagshipEvent } from "./FlagshipEventCard";
import { Link } from "react-router";
import { type EventCategory } from "@/lib/data/unifiedEvents";

// Import your new mock constants
import { MOCK_TECHNOVA, FEATURED_EVENTS_MOCK } from "./heroEvents.constants";

// Visual mapping based on the UnifiedEvent category type
const categoryVisuals: Record<EventCategory, { icon: React.ReactNode; accent: string }> = {
  competition: {
    icon: <Zap className="w-6 h-6" />,
    accent: "from-blue-500 to-indigo-500"
  },
  seminar: {
    icon: <Mic2 className="w-6 h-6" />,
    accent: "from-emerald-500 to-teal-500"
  },
  cultural: {
    icon: <Music className="w-6 h-6" />,
    accent: "from-pink-500 to-rose-500"
  },
  allday: {
    icon: <Star className="w-6 h-6" />,
    accent: "from-amber-500 to-orange-500"
  },
};

const EventsSection = () => {
  // Filter out the flagship event from the secondary grid to avoid duplication
  const secondaryHighlights = FEATURED_EVENTS_MOCK.filter(
    (event) => event.id !== MOCK_TECHNOVA.id
  );

  return (
    <section id="events" className="text-foreground relative py-20 md:py-28 lg:py-36 overflow-hidden bg-[#0a0a0a]">
      {/* The Grid Layer - Using a cleaner CSS-based mask for better visibility */}
      <div className="absolute inset-0 grid-pattern" />

      {/* 1. The Grid: Visible but delicate */}
      <div className="absolute inset-0 grid-pattern opacity-[0.15]" />

      {/* 2. The Radial Fading Mask: Softens the grid lines toward the edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, #030303 100%)'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface mb-8">
            <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Featured Events
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Discover </span>
            <span className="text-gradient">Experiences</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            From intense tech battles to creative showcases—events that challenge, inspire, and celebrate talent.
          </p>
        </motion.div>

        {/* 1. Flagship Highlight */}
        <div className="mb-24 md:mb-32">
          <FlagshipEvent event={MOCK_TECHNOVA} />

          <div className="relative flex items-center gap-6 my-24 opacity-50">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-white/40" />
            <span className="shrink-0 text-[10px] uppercase tracking-[0.5em] text-white font-semibold">
              Other Highlights
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white/20 to-white/40" />
          </div>
        </div>

        {/* 2. Secondary Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {secondaryHighlights.map((event, index) => {
            const visuals = categoryVisuals[event.category];
            return (
              <EventCard
                key={event.id}
                event={event}
                icon={visuals.icon}
                accentColor={visuals.accent}
                index={index}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 md:mt-20"
        >
          <div className="inline-flex flex-col items-center gap-8 px-10 py-12 rounded-3xl glass-surface border border-white/5 max-w-2xl mx-auto">

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                Explore the Full Program
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
                From the main stage competitions to niche workshops—see everything we've planned.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button
                asChild
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 group rounded-xl"
              >
                <Link to="/events">
                  All Events
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Link
                to="/schedule"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                View Full Schedule
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
