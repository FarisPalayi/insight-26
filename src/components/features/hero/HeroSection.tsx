import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { FloatingParticles } from "../../ui/floaters/FloatingParticles";
import { FloatingShapes } from "../../ui/floaters/FloatingShapes";
import { FloatingDots } from "../../ui/floaters/FloatingDots";
import { HeroBadge } from "./HeroBadge";
import { HeroTitle } from "./HeroTitle";
import { HeroVisual } from "./HeroVisual";
import { Link } from "react-router";
import { LocationMeta, DateMeta } from "./MetaItem";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0"
    >
      {/* Background */}
      <HeroVisual />

      {/* Floaters */}
      <FloatingParticles />
      <FloatingShapes />
      <FloatingDots />

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 pt-32 pb-10">
        <div className="hero-content max-w-5xl mx-auto text-center">
          <HeroBadge />
          <HeroTitle />

          {/* Event Meta */}
          <div className="hero-meta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-14">
            <DateMeta />
            <LocationMeta />
          </div>

          <CountdownTimer />

          {/* CTA */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button asChild>
              <Link
                to="/events"
                className="btn-glow max-w-90 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl w-full sm:w-auto"
              >
                Register Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link
                to="/events"
                className="btn-outline-glow max-w-90 text-base px-6 sm:px-8 py-5 sm:py-6 rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 font-normal transition-all duration-300 w-full sm:w-auto text-foreground"
              >
                View Events
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
