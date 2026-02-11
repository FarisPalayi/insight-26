import { gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  caption: string;
  index: number;
}

export const GalleryImage = ({ src, alt, caption, index }: GalleryImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !gradientRef.current) return;

    const ctx = gsap.context(() => {
      // Vary parallax intensity based on index for visual interest
      const intensity = 15 + (index % 3) * 10; // 15px, 25px, or 35px movement

      // Apply parallax to both image AND gradient to prevent rendering gaps
      gsap.fromTo(
        [imageRef.current, gradientRef.current],
        {
          y: -intensity,
        },
        {
          y: intensity,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Image wrapper with extra height for parallax movement */}
      <div className="absolute inset-0 -top-8 -bottom-8">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Gradient overlay - positioned inside parallax wrapper to move with image */}
      <div 
        ref={gradientRef}
        className="absolute inset-0 -top-8 -bottom-8 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
      />

      {/* Caption - stays fixed relative to container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300 pointer-events-none z-10">
        <span className="text-sm font-medium text-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {caption}
        </span>
      </div>

      {/* Subtle border on hover */}
      <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-300 pointer-events-none z-10" />
    </motion.div>
  );
};