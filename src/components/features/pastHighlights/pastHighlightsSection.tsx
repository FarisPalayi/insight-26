import { gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import { Users, Building2, Trophy } from "lucide-react";
import { useEffect, useRef } from "react";
import { GalleryImage } from "./GalleryImage";
import { StatCard } from "./StatsCard";

const stats = [
  { value: "200+", label: "Students Participated", icon: <Users className="w-5 h-5" /> },
  { value: "15", label: "Colleges Represented", icon: <Building2 className="w-5 h-5" /> },
  { value: "₹80K+", label: "Prize Money Distributed", icon: <Trophy className="w-5 h-5" /> },
];

const galleryImages = [
  {
    src: "/gallery/workshop-sm.jpg",
    alt: "Workshop session with students",
    caption: "Technical Workshop"
  },
  {
    src: "/gallery/group-sm.jpg",
    alt: "Insight team",
    caption: "Technova team",
  },
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=450&fit=crop",
    alt: "Cultural night performance",
    caption: "Cultural Night"
  },
  {
    src: "/gallery/robo-with-board-sm.jpg",
    alt: "Student dressed as a robot posing",
    caption: "Robo"
  },
];

const PastEditionHighlights = () => {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroGradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroContainerRef.current || !heroImageRef.current || !heroGradientRef.current) return;

    const ctx = gsap.context(() => {
      // Apply parallax to both image and gradient
      gsap.fromTo(
        [heroImageRef.current, heroGradientRef.current],
        {
          y: -40,
          scale: 1.1,
        },
        {
          y: 40,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="highlights" className="relative pt-24 md:pt-32 lg:pt-40 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="space-y-12 md:space-y-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Last Year's <span className="text-gradient">Highlights</span>
            </h2>
          </motion.div>

          {/* Hero Image + Stats - Asymmetric Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Main Hero Image - Takes 3 columns on large screens */}
            <motion.div
              ref={heroContainerRef}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden group"
            >
              {/* Image wrapper with extra height for parallax */}
              <div className="absolute inset-0 -top-12 -bottom-12">
                <img
                  ref={heroImageRef}
                  src="/gallery/inauguration-sm.jpg"
                  alt="Insight'25 main event crowd"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient overlay from bottom - moves with image */}
              <div 
                ref={heroGradientRef}
                className="absolute inset-0 -top-12 -bottom-12 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" 
              />

              {/* Caption overlay - stays fixed */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none z-10">
                <div className="space-y-2">
                  <p className="text-sm font-mono text-primary">Opening Ceremony</p>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Two days of innovation begins
                  </h3>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
            </motion.div>

            {/* Stats Cards - Takes 2 columns, stacked vertically */}
            <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} index={index} />
              ))}
            </div>
          </div>

          {/* Gallery Grid - 4 Equal Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <GalleryImage key={index} {...image} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PastEditionHighlights;