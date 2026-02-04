import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { FloatingParticles } from "../../ui/floaters/FloatingParticles";
import { FloatingShapes } from "../../ui/floaters/FloatingShapes";
import { FloatingDots } from "../../ui/floaters/FloatingDots";
import { HeroBadge } from "./HeroBadge";
import { HeroTitle } from "./HeroTitle";
import { Link } from "react-router";
import { HeroVisual } from "./HeroVisual";

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroVisual />

      <FloatingParticles />
      <FloatingShapes />
      <FloatingDots />
      {/* Main Content */}
      <div className="container relative z-10 px-4 sm:px-6 pt-32 pb-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
        >
          <HeroBadge />
          <HeroTitle />

          {/* Event Details */}
          <motion.div className="text-foreground flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary/70">Timeline</span>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span className="text-sm font-bold tracking-tight">16—17 FEB 2026</span>
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />

            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent/70">Location</span>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span className="text-sm font-bold tracking-tight">CCSIT CU CAMPUS</span>
              </div>
            </div>
          </motion.div>
          <CountdownTimer />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button asChild>
              <Link
                to="/register"
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl w-full sm:w-auto"
              >
                Register Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link
                to="/events"
                className="btn-outline-glow text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 font-normal transition-all duration-300 w-full sm:w-auto text-foreground"
              >
                View Events
              </Link>
            </Button>

          </motion.div>
        </motion.div>
      </div>

    </section>

  );
};

export default HeroSection;
