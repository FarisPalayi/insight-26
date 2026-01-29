import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Camera, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "./EventCard";
import { FlagshipEvent } from "./FlagshipEventCard";

const EventsSection = () => {
  const FeaturedEvents = [
    {
      name: "Shoot Sync",
      category: "Photography",
      tagline: "Capture the moment, freeze the magic in every frame. Showcase your creative eye and visual storytelling.",
      icon: <Camera className="w-6 h-6" />,
      accentColor: "from-pink-500 to-rose-500",
      urlPath: "/photography",
    },
    {
      name: "Scavenge Squad",
      category: "Team Fun",
      tagline: "Race against time, hunt for clues, claim victory. Team up for the ultimate treasure hunt experience.",
      icon: <Users className="w-6 h-6" />,
      accentColor: "from-emerald-500 to-teal-500",
      urlPath: "/treasure-hunt",
    },
    {
      name: "Talen'X",
      category: "Open Stage",
      tagline: "Unleash your hidden talents and steal the spotlight. Dance, sing, perform—let your creativity shine.",
      icon: <Star className="w-6 h-6" />,
      accentColor: "from-amber-500 to-orange-500",
      urlPath: "/talenx",
    },
  ];

  return (
    <section id="events" className="relative pt-24 md:pt-32 lg:pt-40 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Featured Events</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6" id="featured-events">
            <span className="text-foreground">Featured </span>
            <span className="text-gradient">Events</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From intense tech battles to creative showcases—discover experiences that challenge, inspire, and celebrate talent.
          </p>
        </motion.div>

        {/* Featured Event */}
        <div className="mb-12 md:mb-16">
          <FlagshipEvent />
        </div>

        {/* Secondary Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FeaturedEvents.map((event, index) => (
            <EventCard
              key={event.name}
              {...event}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">More events coming soon...</p>
          <Button
            variant="outline"
            size="lg"
            className="btn-outline-glow gap-2 text-foreground"
          >
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;

