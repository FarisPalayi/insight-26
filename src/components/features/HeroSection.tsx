import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { StatsCards } from "./Stats";
import { FloatingOrb } from "./FloatingOrb";
import { FloatingParticles } from "./FloatingParticles";
import { FloatingShapes } from "./FloatingShapes";
import { FloatingDots } from "./FloatingDots";
import { HeroBadge } from "./HeroBadge";
import { HeroTitle } from "./HeroTitle";
import { HeroSubtitle } from "./HeroSubtitle";

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Gradient Orbs */}
      <FloatingOrb
        className="bg-primary/30 top-0 -left-48"
        size="w-[500px] h-[500px]"
      />
      <FloatingOrb
        className="bg-accent/25 bottom-0 -right-48"
        delay={4}
        size="w-[600px] h-[600px]"
      />
      <FloatingOrb
        className="bg-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        delay={2}
        size="w-[800px] h-[800px]"
      />

      <FloatingParticles />
      <FloatingShapes />
      <FloatingDots />
      {/* Main Content */}
      <div className="container relative z-10 px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <motion.div
          className="max-w-5xl mx-auto text-center"
        >
          <HeroBadge />
          <HeroTitle />

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-14"
          >
            <motion.div
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl group cursor-default w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base font-medium text-foreground">17 & 18 February 2026</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl group cursor-default w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base font-medium text-foreground">CCSIT CU Campus</span>
            </motion.div>
          </motion.div>

          <CountdownTimer />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              size="lg"
              className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground group text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-semibold w-full sm:w-auto"
            >
              Register Now
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-outline-glow text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 font-semibold transition-all duration-300 w-full sm:w-auto text-foreground"
            >
              View Events
            </Button>

          </motion.div>

          <StatsCards />
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
