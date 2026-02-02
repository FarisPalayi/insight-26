import { motion } from "framer-motion";
import { Camera, Users, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "./EventCard";
import { FlagshipEvent } from "./FlagshipEventCard";
import { Link } from "react-router";

const EventsSection = () => {
  const FeaturedEvents = [
    {
      name: "Shoot Sync",
      category: "Photography",
      tagline: "Capture the moment, freeze the magic in every frame. Showcase your creative eye and visual storytelling.",
      icon: <Camera className="w-6 h-6" />,
      accentColor: "from-pink-500 to-rose-500",
      urlPath: "/events/photo-competition",
    },
    {
      name: "Scavenge Squad",
      category: "Team Fun",
      tagline: "Race against time, hunt for clues, claim victory. Team up for the ultimate treasure hunt experience.",
      icon: <Users className="w-6 h-6" />,
      accentColor: "from-emerald-500 to-teal-500",
      urlPath: "/events/treasure-hunt",
    },
    {
      name: "Talen'X",
      category: "Open Stage",
      tagline: "Unleash your hidden talents and steal the spotlight. Dance, sing, perform—let your creativity shine.",
      icon: <Star className="w-6 h-6" />,
      accentColor: "from-amber-500 to-orange-500",
      urlPath: "/events/talenx",
    },
  ];

  return (
    <section id="events" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Refined background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Improved */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface mb-6 md:mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">Featured Events</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="text-foreground">Discover </span>
            <span className="text-gradient">Experiences</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            From intense tech battles to creative showcases—events that challenge, inspire, and celebrate talent.
          </p>
        </motion.div>

        {/* Flagship Event - Better spacing */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <FlagshipEvent />
        </div>

        {/* Divider with text */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12 md:mb-16 max-w-4xl mx-auto"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-medium px-4">
            More Highlights
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* Secondary Events Grid - Improved */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {FeaturedEvents.map((event, index) => (
            <EventCard
              key={event.name}
              {...event}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 px-8 py-10 rounded-2xl glass-surface max-w-2xl mx-auto">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Explore All Events
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Discover competitions, workshops, cultural programs, and more
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group"
              asChild
            >
              <Link to="/events">
                Explore All Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
