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
import { useMagneticButton } from "@/hooks/useMagneticButton";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);

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
        y: 30,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          meta,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          cta,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Scroll-based compression 
      gsap.to(content, {
        scale: 0.96,
        y: -40,
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

  const primaryMagnet = useMagneticButton({
    strength: 0.22,
    radius: 80
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
            <div ref={primaryMagnet.ref} className="inline-block">
              <Button asChild>
                <Link
                  to="/register"
                  className="btn-glow bg-primary text-primary-foreground font-semibold group text-base px-8 py-6 rounded-xl"
                >
                  <span className="inline-flex items-center">
                    Register Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>

            <Button variant="outline" size="lg" asChild>
              <Link
                to="/events"
                className="btn-outline-glow text-base px-8 py-6 rounded-xl border-primary/30 hover:bg-primary/10"
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
