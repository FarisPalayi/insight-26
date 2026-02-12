import { motion } from "framer-motion";
import { ArrowRight, Flag, Wand2,BrainCircuit,Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "./EventCard";
import { FlagshipEvent } from "./FlagshipEventCard";
import { Link } from "react-router";

// Import your new mock constants
import { MOCK_TECHNOVA, FEATURED_EVENTS_MOCK } from "./heroEvents.constants";

const ROTATING_VISUALS = [
  {
    icon: <Wand2 className="w-6 h-6" />,
    accent: "from-cyan-500 to-blue-500",
  },
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: <Map className="w-6 h-6" />,
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: <Flag className="w-6 h-6" />,
    accent: "from-emerald-400 to-teal-500",
  },
];

const EventsSection = () => {
  // Filter out the flagship event from the secondary grid to avoid duplication
  const secondaryHighlights = FEATURED_EVENTS_MOCK.filter(
    (event) => event.id !== MOCK_TECHNOVA.id
  );

  return (
    <section id="events" className="text-foreground relative pt-20 md:py-28 lg:py-36 overflow-hidden bg-[#0a0a0a]">
      {/* The Grid Layer - Using a cleaner CSS-based mask for better visibility */}
      <div className="absolute inset-0 grid-lines" />

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

          <h2 className="text-5xl text-foreground md:text-7xl font-bold tracking-tighter leading-[0.95] text-balance">
            <span className="text-foreground">Discover </span>
            <span className="text-gradient">Experiences</span>
          </h2>
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
          {secondaryHighlights.map((event, i) => {
            const visuals = ROTATING_VISUALS[i % ROTATING_VISUALS.length];

            return (
              <EventCard
                key={event.id}
                event={event}
                icon={visuals.icon}
                accentColor={visuals.accent}
                index={i}
                data-lag={i * 0.1}
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
          <div className="inline-flex flex-col items-center gap-8 px-10 py-12 rounded-3xl max-w-2xl mx-auto">

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                Explore the Full Program
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
                From the competitions to seminars—see everything we've planned.
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
