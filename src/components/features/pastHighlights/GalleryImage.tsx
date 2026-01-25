import { motion } from "framer-motion";

interface GalleryImageProps {
  src: string;
  alt: string
  caption: string;
  index: number;
}

export const GalleryImage = ({ src, alt, caption, index }: GalleryImageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    {/* Gradient overlay - always visible on mobile, hover on desktop */}
    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

    {/* Caption */}
    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
      <span className="text-sm font-medium text-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75">
        {caption}
      </span>
    </div>

    {/* Subtle border on hover */}
    <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />
  </motion.div>
);

