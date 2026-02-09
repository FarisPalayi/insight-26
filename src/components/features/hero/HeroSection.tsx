import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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

  /* --------------------------------
     HERO ORCHESTRATION + SCROLL LOGIC
  ---------------------------------*/
  useGSAP(
    () => {
      const content = sectionRef.current!.querySelector(
        ".hero-content"
      ) as HTMLElement;
      const meta = sectionRef.current!.querySelector(
        ".hero-meta"
      ) as HTMLElement;
      const cta = sectionRef.current!.querySelector(
        ".hero-cta"
      ) as HTMLElement;

      // Entrance choreography
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(content, {
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          meta,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          cta,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Scroll-based compression 
      gsap.to(content, {
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

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
                to="/register"
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
