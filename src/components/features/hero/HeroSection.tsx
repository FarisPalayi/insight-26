import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { StatsCards } from "../Stats";
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
              <span className="font-medium text-foreground">16 & 17 February 2026</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl group cursor-default w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-medium text-foreground">CCSIT CU Campus</span>
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

          <StatsCards />
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
